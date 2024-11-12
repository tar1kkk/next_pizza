import React from 'react';
import {cn} from "@/shared/lib/utils";
import {ProductImage} from "@/shared/components/shared/products-image";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {GroupVariant} from "@/shared/components/shared/group-variants";
import {mapPizzaType, PizzaSize,  PizzaType, pizzaTypes} from "@/shared/constants/pizza";
import {IngredientItem} from '@/shared/components/shared/ingredient-item';
import {Ingredient} from ".prisma/client";
import {ProductItem} from "@prisma/client";
import {calcTotalPizzaPrice} from "@/shared/lib/calc-total-pizza-price";
import {usePizzaOptions} from "@/shared/hooks/use-pizza-options";


interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onSubmit: (itemId : number, ingredients : number[])=> void;
    onClickAddCart?: VoidFunction;
    loading?: boolean;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({className,onSubmit, name, items, imageUrl, ingredients, onClickAddCart,loading}) => {

    const {size, type, selectedIngredients,  setType, setSize, availableSizes,addIngredient,currentItemId} = usePizzaOptions(items);
    const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;
    const totalPrice = calcTotalPizzaPrice(items, ingredients, type, size, selectedIngredients)


    const handleClick = () => {
        if(currentItemId){
            onSubmit(currentItemId,Array.from(selectedIngredients));
        }
    }

    return (
        <div className={cn(className, 'flex flex-1')}>
            <ProductImage imageUrl={imageUrl} size={size}/>
            <div className='w-[490px] bg-[#f2f6f6] p-7'>
                <Title text={name} size='md' className='font-extrabold nb-1'/>
                <p className='text-gray-400'>{textDetails}</p>
                <div className='flex flex-col gap-4 mt-5'>
                    <GroupVariant items={availableSizes} value={String(size)}
                                  onClick={value => setSize(Number(value) as PizzaSize)}/>
                    <GroupVariant items={pizzaTypes} value={String(type)}
                                  onClick={value => setType(Number(value) as PizzaType)}/>

                </div>
                <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
                    <div className='grid grid-cols-3 gap-3'>
                        {ingredients.map((item) => (
                            <IngredientItem
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                onClick={() => addIngredient(item.id)}
                                active={selectedIngredients.has(item.id)}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    loading={loading}
                    onClick={handleClick}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₴
                </Button>
            </div>
        </div>
    )
}