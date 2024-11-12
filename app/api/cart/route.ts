import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import crypto from 'crypto';
import {findOrCreateCart} from "@/shared/lib/find-or-create-cart";
import {CreateCartItemValues} from "@/shared/services/cart";
import {updateCartTotalAmount} from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
    try {
        const userId = 1;
        const token = req.cookies.get('cartToken')?.value;
        if (!token) {
            return NextResponse.json({totalAmount: 0, items: []});
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    },
                ],
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true
                            },
                        },
                        ingredients: true,
                    }
                },
            },
        });
        return NextResponse.json(userCart);
    } catch (e) {
        console.log(e);
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }
        const data = (await req.json()) as CreateCartItemValues;
        const userCart = await findOrCreateCart(token);


        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingredients: {some: {id: {in: data.ingredients}}},
            },
        });
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            });
        }else {
            await prisma.cartItem.create({
                data : {
                    cartId: userCart.id,
                    productItemId : data.productItemId,
                    quantity : 1,
                    ingredients : {connect : data.ingredients?.map((id)=> ({id}))}
                }
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);
        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token);
        return resp;
    } catch (e) {
        console.log(e);
        return NextResponse.json({message: 'ошибка корзины'}, {status: 500});
    }
}