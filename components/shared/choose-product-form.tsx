import React, {FC} from 'react';
import {cn} from "@/lib/utils";
import {ProductImage} from "@/components/shared/products-image";
import {Title} from "@/components/shared/title";
import {Button} from "@/components/ui";


interface Props {
    imageUrl: string;
    name: string;
    ingredients: any[];
    items: any[];
    onClickAdd?: VoidFunction;
    className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({className, name, items, imageUrl, ingredients, onClickAdd,}) => {
    const totalPrice = 350;
    const textDetails = '30 см, традиционное тесто'
    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className='flex items-center justify-center flex-1 relative w-full'>
                <img src={imageUrl} alt={name}
                     className='relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[350px]'/>
            </div>

            <div className='w-[490px] bg-[#f2f6f6] p-7'>
                <Title text={name} size='md' className='font-extrabold nb-1'/>
                <p className='text-gray-400'>{textDetails}</p>

                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}