import {cn} from "@/shared/lib/utils";
import {CartItemDetailsImage} from "@/shared/components/shared/cart-item-details/cart-item-details-image";
import {CartItemInfo} from "@/shared/components/shared/cart-item-details/cart-item-info";
import {CartItemDetailsPrice} from "@/shared/components/shared/cart-item-details/cart-item-details-price";
import {CartItemDetailsCountButton} from "@/shared/components/shared/cart-item-details/cart-item-details-count-button";
import {X} from "lucide-react";
import {CartItemProps} from "@/shared/components/shared/cart-item-details/cart-item-details.types";

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

export const CartItem: React.FC<Props> = ({
                                              name,
                                              price,
                                              imageUrl,
                                              quantity,
                                              details,
                                              disabled,
                                              className,
                                              onClickCountButton,
                                              onClickRemove,
                                          }) => {
    return (
        <div className={cn('flex items-center justify-between',{'opacity-50 pointer-events-none' : disabled}, className)}>
            <div className='flex items-center gap-5 flex-1'>
                <CartItemDetailsImage src={imageUrl}/>
                <CartItemInfo name={name} details={details}/>
            </div>

            <CartItemDetailsPrice value={price}/>

            <div className='flex items-center gap-5 ml-20'>
                <CartItemDetailsCountButton onClick={onClickCountButton}  value={quantity}/>
                <button type='button' onClick={onClickRemove}>
                    <X className='text-gray-400 cursor-pointer hover:text-gray-400' size={20}/>
                </button>
            </div>
        </div>
    )
}