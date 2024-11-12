'use client';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
    Sheet, SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/shared/components/ui/sheet";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Button} from "@/shared/components/ui";
import Link from "next/link";
import {CartDrawerItem} from "@/shared/components/shared/cart-drawer-item";
import {getCartItemsDetails} from "@/shared/lib/get-cart-items-details";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import Image from 'next/image';
import {Title} from "@/shared/components/shared/title";
import {cn} from "@/shared/lib/utils";
import {useCart} from "@/shared/hooks/useCart";

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({className, children}) => {
  const {totalAmount,items,updateItemQuantity,removeCartItem,loading} = useCart();
    const [redirecting,setRedirecting] = useState(false);
    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        console.log({'newQuantity': newQuantity, 'id': id});
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>В корзине <span className='font-bold'>{items.length} товара</span></SheetTitle>
                        </SheetHeader>
                    )}

                    {!totalAmount && (
                        <div className='flex flex-col items-center justify-center w-72 mx-auto'>
                            <Image src='/assets/images/empty-box.png' alt='Empty cart' width={120} height={120}/>
                            <Title text='Корзина пустая' size='sm' className='text-center font-bold my-2'/>
                            <p className='text-center text-neutral-500 mb-3'>
                                Добавьте хотя бы одну пиццу, чтобы совершить заказ
                            </p>
                            <SheetClose>
                                <Button className='w-56 h-12 text-base' size='lg'>
                                    <ArrowLeft className='w-5 mr-2'/>
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    <div className='-mx-6 mt-5 overflow-auto flex-1 scrollbar'>
                        {items.map((item) => (
                            <div className='mb-2' key={item.id}>
                                <CartDrawerItem id={item.id} imageUrl={item.imageUrl}
                                                details={item.pizzaSize && item.pizzaType ? getCartItemsDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ''}
                                                name={item.name} price={item.price} quantity={item.quantity}
                                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                                onClickRemove={() => removeCartItem(item.id)} disabled={item.disabled}/>
                            </div>
                        ))}
                    </div>
                    {items.length ? <SheetFooter className="-mx-6 bg-white p-8">
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
                                    onClick={()=> setRedirecting(true)}
                                    loading={redirecting}
                                    type="submit"
                                    className="w-full h-12 text-base">
                                    Оформить заказ
                                    <ArrowRight className="w-5 ml-2"/>
                                </Button>
                            </Link>
                        </div>
                    </SheetFooter> : ''}
                </div>
            </SheetContent>
        </Sheet>

    )
}