'use client';
import React, {useState} from 'react';
import {FilterChecboxProps, FilterCheckbox} from "@/components/shared/filter-checkbox";
import {Input, Skeleton} from "@/components/ui";

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    className?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
}


const CheckboxFilterGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit = 5,
        searchInputPlaceholder,
        className,
        onChange,
        defaultValue,
        loading,
    }
) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (value: string) => {
        setSearchValue(value);
    }


    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit);

    if (loading) {
        return (
            <div className={className}>
                <p className='font-bold mb-3'>{title}</p>
                {Array.from({length : limit}).map((item,index)=>(
                    <Skeleton key={index} className='h-6 mb-4 rounded-[8px]'/>
                ))}
            </div>
        )
    }
    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>

            {showAll && (
                <div className='mb-5'>
                    <Input onChange={e => onChangeSearchInput(e.target.value)} placeholder={searchInputPlaceholder}
                           className='bg-gray-50 border-none'/>
                </div>
            )}

            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
                {list.map((item, index) => (
                    <FilterCheckbox
                        onCheckedChange={(ids) => console.log(ids)}
                        checked={false}
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckboxFilterGroup;
