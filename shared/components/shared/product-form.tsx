'use client'
import React from 'react';
import {useCartStore} from "@/shared/store/cart";
import toast from "react-hot-toast";
import {ChoosePizzaForm} from "@/shared/components/shared/choose-pizza-form";
import {ChooseProductForm} from "@/shared/components/shared/choose-product-form";
import {useRouter} from "next/navigation";


interface Props {
    product : any;
    className? : string;
}

export const ProductForm : React.FC<Props> = ({className,product})=>{
    const router = useRouter();
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);
    const onSubmit = async (productItemId: number, ingredients?: number[]) => {
        try{
            const itemId = productItemId ?? firstItem.id;
            await addCartItem({
                productItemId : itemId,
                ingredients,
            });
            toast.success(product.name + ' добавлена в коризну');
            router.back();
        } catch (e) {
            toast.error('Не удалось добавить товар в корзину!');
            console.error(e);
        }
    }
   if(isPizzaForm){
       return  <ChoosePizzaForm onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name}
                                ingredients={product.ingredients} items={product.items} loading={loading}/>
   }

   return (
       <ChooseProductForm onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name}
                          ingredients={[]} price={firstItem.price} loading={loading}/>

   )
}