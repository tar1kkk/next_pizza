'use client';
import React, {useState} from 'react';
import {FilterChecboxProps, FilterCheckbox} from "@/shared/components/shared/filter-checkbox";
import {Input, Skeleton} from "@/shared/components/ui";

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    className?: string;
    onClickCheckbox?: (id : string) => void;
    defaultValue?: string[];
    selectedIds : Set<string>;
    name? : string;
}


const CheckboxFilterGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit = 4,
        searchInputPlaceholder,
        className,
        defaultValue,
        loading,
        onClickCheckbox,
        selectedIds,
        name
    }
) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (value: string) => {
        setSearchValue(value);
    }

    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0, limit);

    if (loading) {
        return (
            <div className={className}>
                <p className='font-bold mb-3'>{title}</p>
                {Array.from({length : limit}).map((item,index)=>(
                    <Skeleton key={index} className='h-6 mb-4 rounded-[8px]'/>
                ))}
                <Skeleton className='mb-5 w-28 h-6 rounded-[8px]'/>
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
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        checked={selectedIds?.has(item.value)}
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        name={name}
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
