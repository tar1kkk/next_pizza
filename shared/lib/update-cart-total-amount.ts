import { prisma } from "@/prisma/prisma-client";
import { caltCartItemTotalPrice } from "@/shared/lib/calt-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            token,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });

    if (!userCart || !Array.isArray(userCart.items)) {
        return;
    }

    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + caltCartItemTotalPrice(item);
    }, 0);

    const updatedCart = await prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });

    return updatedCart;
};
