import React from 'react';
import {CartItemDetailsImage} from "@/shared/components/shared/cart-item-details/cart-item-details-image";
import {CartItemProps} from "@/shared/components/shared/cart-item-details/cart-item-details.types";
import {CartItemInfo} from "@/shared/components/shared/cart-item-details/cart-item-info";
import {CountButton} from "@/shared/components/shared/count-button";
import {CartItemDetailsPrice} from "@/shared/components/shared/cart-item-details/cart-item-details-price";
import {Trash2Icon} from "lucide-react";

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
                                                    className,
                                                    details,
                                                    name,
                                                    imageUrl,
                                                    price,
                                                    type,
                                                    quantity,
                                                    onClickCountButton,
                                                    removeCartItem
                                                }) => {
    return (
        <div className={'flex bg-white p-5 gap-6'}>
            <CartItemDetailsImage src={imageUrl}/>

            <div className='flex-1'>
                <CartItemInfo details={details} name={name}/>

                <hr className='my-3'/>
                <div className='flex items-center justify-between'>
                    <CountButton onClick={onClickCountButton} value={quantity}/>

                    <div className='flex items-center gap-3'>
                        <CartItemDetailsPrice value={price}/>
                        <Trash2Icon onClick={removeCartItem} className='text-gray-400 cursor-pointer- hover:text-gray-600' size={16}/>
                    </div>
                </div>
            </div>
        </div>
    )
}