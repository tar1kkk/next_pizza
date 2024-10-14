import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import {updateCartTotalAmount} from "@/shared/lib/update-cart-total-amount";

export async function PATCH(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        const {id} = params;
        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get('cartToken')?.value;
        if (!token) {
            return NextResponse.json({error: 'Cart token not found'});
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id),
            },
        });

        if (!cartItem) {
            return NextResponse.json({error: 'Cart item not found'});
        }

        await prisma.cartItem.update({
            where: {
                id: Number(id),
            },
            data: {
                quantity: data.quantity,
            }
        });


        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    } catch (e) {
        console.log(e, '[CART_PATCH] Server error');
        return NextResponse.json({message: '[CART_PATCH] Server error'}, {status: 500});
    }
}

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const token = req.cookies.get('cartToken')?.value;
        if (!token) {
            return NextResponse.json({error: 'Cart token not found'});
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(params.id),
            },
        });
        if (!cartItem) {
            return NextResponse.json({error : 'Cart item not found'});
        }

        await prisma.cartItem.delete({
            where: {
                id : Number(params.id),
            },
        });
        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);

    } catch (e) {
        console.log(e)
        return NextResponse.json({message: 'Не удалось удалить корзину'}, {status: 500});
    }
}