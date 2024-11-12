'use server'
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import {cookies} from "next/headers";
import {senEmail} from "@/shared/lib/senEmail";
import {PayOrderTemplate} from "@/shared/components/shared/email-templates/pay-order";
import {createPayment} from "@/shared/lib/create-payment";
import {getUserSession} from "@/shared/lib/get-user-sesson";
import {hashSync} from "bcrypt";
import {VerificationUser} from "@/shared/components/shared/email-templates/verification-user";

export async function createOrder(data) {
    try {
        const cookiesStore = cookies();
        const cartToken = cookiesStore.get('cartToken')?.value;

        if (!cartToken) {
            throw new Error('Cart token not found');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            }
        });

        if (!userCart) {
            throw new Error('Cart not found');

        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty!');
        }
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            }
        });
        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа #' + order.id,
        });

        if (!paymentData) {
            throw new Error('Не удалось создать платёж');
        }
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });
        const paymentUrl = paymentData.confirmation.return_url;
        await senEmail(data.email, `Pizza | Оплатите заказ #${order.id}`, PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl,
        }));
        return paymentUrl;
    } catch (e) {
        console.log('CreateOrder Server error', e);
    }
};

export async function updateUserInfo(body: Prisma.UserCreateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Пользователь не найден');
        }
        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });
        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function registerUser(body) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Почта не подтверждена');
            }

            throw new Error('Пользователь уже существует');
        }

        const createdUser = await prisma.user.create({
            data: {
                ...body,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
        });

        await senEmail(createdUser.email, `Pizza |  Подтверждение регистрации`, VerificationUser({
            code,
        }));

    } catch (e) {
        console.log(e);
        throw e;
    }
}