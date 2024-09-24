'use client'
import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {Title} from "@/components/shared/title";
import {Input} from "@/components/ui";
import {RangeSlider} from "@/components/ui/range-slider";
import CheckboxFilterGroup from "@/components/shared/checkbox-filters-group";
import qs from 'qs';
import {useRouter, useSearchParams} from "next/navigation";
import {useFilters} from "@/hooks/use-filters";
import {useIngredients} from "@/hooks/use-ingredients";
import {useQueryFilters} from "@/hooks/use-query-filters";

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}


const Filters: React.FC<Props> = ({className}) => {
    const {
        selectedIngredients,
        sizes,
        pizzaTypes,
        price,
        setPrice,
        setPizzaTypes,
        setSize,
        onAddId,
        onChangePrice
    } = useFilters();

    useQueryFilters(selectedIngredients, sizes, pizzaTypes, price);

    const {ingredients, loading} = useIngredients();

    const items = ingredients.map((item) => ({value: String(item.id), text: item.name}))


    return (
        <div className={cn('', className)}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold'/>

            {/* Верхние чекбоксы */}
            <CheckboxFilterGroup
                name='pizzaTypes'
                className='mb-5'
                title='Тип теста'
                onClickCheckbox={setPizzaTypes}
                selectedIds={pizzaTypes}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'},
                ]}
            />
            <CheckboxFilterGroup
                name='sizes'
                className='mb-5'
                title='Размеры'
                onClickCheckbox={setSize}
                selectedIds={sizes}
                items={[
                    {text: '20 см', value: '20'},
                    {text: '30 см', value: '30'},
                    {text: '40 см', value: '40'}
                ]}
            />

            {/* Фильтр цен */}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='flex gap-3 mb-5'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={1000} value={String(price.priceFrom)}
                           onChange={(e) => onChangePrice('priceFrom', Number(e.target.value))}/>
                    <Input type='number' min={100} placeholder='1000' max={1000} value={String(price.priceTo)}
                           onChange={(e) => onChangePrice('priceTo', Number(e.target.value))}
                    />
                </div>
                <RangeSlider min={0} max={1000} step={10} value={[price.priceFrom || 0, price.priceTo || 1000]}
                             onValueChange={([from, to]) => setPrice({priceFrom: from, priceTo: to})}
                />
            </div>

            <CheckboxFilterGroup
                searchInputPlaceholder='Поиск...'
                title={'Ингредиенты'}
                items={items}
                loading={loading}
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                onClickCheckbox={onAddId}
                selectedIds={selectedIngredients}
                name={'ingredients'}
            />
        </div>
    );
};

export default Filters;