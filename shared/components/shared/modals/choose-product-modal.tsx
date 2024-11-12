'use client'
import React, {useState} from 'react';
import {Dialog} from "@/shared/components/ui";
import {DialogContent} from "@/shared/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ChooseProductForm} from "@/shared/components/shared/choose-product-form";
import {IProduct} from "@/@types/prisma";
import {ChoosePizzaForm} from "@/shared/components/shared/choose-pizza-form";
import {useCartStore} from "@/shared/store/cart";
import toast from "react-hot-toast";
import {ProductForm} from "@/shared/components/shared/product-form";

interface Props {
    className?: string;
    product: IProduct;
}

export const ChooseProductModal: React.FC<Props> = ({className, product}) => {
    const router = useRouter();
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className='p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
                <ProductForm product={product}/>
            </DialogContent>
        </Dialog>
    )
}