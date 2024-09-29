'use client'
import React from 'react';
import {Dialog} from "@/components/ui";
import {DialogContent} from "@/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ChooseProductForm} from "@/components/shared/choose-product-form";
import {IProduct} from "@/@types/prisma";
import {ChoosePizzaForm} from "@/components/shared/choose-pizza-form";

interface Props {
    className? : string;
    product: IProduct;
}

export const ChooseProductModal : React.FC<Props> = ({className,product})=>{
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);
    return (
        <Dialog open={Boolean(product)} onOpenChange={()=> router.back()}>
            <DialogContent className='p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
                {isPizzaForm ? (
                    <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} items={[]}/>
                ): (
                    <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[] }/>
                )}
            </DialogContent>
        </Dialog>
    )
}