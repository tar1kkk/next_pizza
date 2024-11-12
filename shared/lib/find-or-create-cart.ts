import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string) => {
    try {
        let userCart = await prisma.cart.findFirst({
            where: {
                token,
            },
        });

        if (!userCart) {
            userCart = await prisma.cart.create({
                data: {
                    token,
                },
            });
        }

        return userCart;
    } catch (error) {
        console.error("Error in findOrCreateCart:", error);
        throw new Error("Unable to find or create cart");
    }
};
