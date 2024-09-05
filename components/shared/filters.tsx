import React from 'react';
import {cn} from "@/lib/utils";
import {Title} from "@/components/shared/title";
import {FilterCheckbox} from "@/components/shared/filter-checkbox";
import {Input} from "@/components/ui";
import {RangeSlider} from "@/components/ui/range-slider";
import CheckboxFilterGroup from "@/components/shared/checkbox-filters-group";


interface Props {
    className?: string;
}

const Filters: React.FC<Props> = ({className}) => {
    return (
        <div className={cn('', className)}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold'/>

            {/* Верхние чекбоксы */}
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1"/>
                <FilterCheckbox text="Новинки" value="2"/>
            </div>
            {/* Фильтр цен */}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='flex gap-3 mb-5'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0}/>
                    <Input type='number' min={100} placeholder='1000' max={1000}/>
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]}/>
            </div>

            <CheckboxFilterGroup
                searchInputPlaceholder='Поиск...'
                title={'Ингредиенты'}
                items={[
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моццарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Солённые огурчики',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6',
                    },
                ]}
                className='mt-5'
                limit={4}
                defaultItems={[
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моццарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Солённые огурчики',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6',
                    },
                ]}/>

        </div>
    );
};

export default Filters;