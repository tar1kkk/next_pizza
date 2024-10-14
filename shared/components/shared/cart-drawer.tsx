'use client';
import React, {PropsWithChildren, useEffect} from 'react';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/shared/components/ui/sheet";
import {ArrowRight} from "lucide-react";
import {Button} from "@/shared/components/ui";
import Link from "next/link";
import {CartDrawerItem} from "@/shared/components/shared/cart-drawer-item";
import {getCartItemsDetails} from "@/shared/lib/get-cart-items-details";
import {useCartStore} from "@/shared/store/cart";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";


interface Props {
    className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({className, children}) => {
    const {totalAmount, fetchCartItems, items,updateItemQuantity,removeCartItem} = useCartStore(state => ({
        totalAmount: state.totalAmount,
        fetchCartItems: state.fetchCartItems,
        updateItemQuantity : state.updateItemQuantity,
        items: state.items,
        removeCartItem : state.removeCartItem
    }));

    useEffect(() => {
        fetchCartItems();
    }, []);

    const onClickCountButton = (id: number,quantity : number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id,newQuantity);
    }
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
                <SheetHeader>
                    <SheetTitle>В корзине <span className='font-bold'>{items.length} товара</span></SheetTitle>
                </SheetHeader>

                <div className='-mx-6 mt-5 overflow-auto flex-1 scrollbar'>
                    <div className='mb-2'>
                        {items.map((item) => (
                            <CartDrawerItem key={item.id} id={item.id} imageUrl={item.imageUrl}
                                            details={item.pizzaSize && item.pizzaType ? getCartItemsDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ''}
                                            name={item.name} price={item.price} quantity={item.quantity}
                                            onClickCountButton={(type)=> onClickCountButton((item.id,item.quantity,type))} onClickRemove={()=> updateItemQuantity(item.id,0)}/>
                        ))}
                    </div>
                </div>
                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                                <span className="flex flex-1 text-lg text-neutral-500">
                                  Итого
                                  <div
                                      className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                                </span>
                            <span className="font-bold text-lg">{totalAmount} $</span>
                        </div>
                        <Link href="/checkout">
                            <Button
                                type="submit"
                                className="w-full h-12 text-base">
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2"/>
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    )
}