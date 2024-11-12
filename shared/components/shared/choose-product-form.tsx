import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";


interface Props {
    imageUrl: string;
    name: string;
    ingredients: any[];
    items: any[];
    price : number;
    onSubmit?: (itemId : number, ingredients : number[])=> void;
    onClickAdd?: VoidFunction;
    loading? : boolean;
    className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({className,onSubmit,loading, name,price, items, imageUrl, ingredients, onClickAdd,}) => {
    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className='flex items-center justify-center flex-1 relative w-full'>
                <img src={imageUrl} alt={name}
                     className='relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[350px]'/>
            </div>

            <div className='w-[490px] bg-[#f2f6f6] p-7'>
                <Title text={name} size='md' className='font-extrabold nb-1'/>

                <Button
                    loading={loading}
                    onClick={()=> onSubmit()}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div>
    )
}