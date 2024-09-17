'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Search} from "lucide-react";
import {useClickAway} from "react-use";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Api} from "@/services/api-client";
import {Product} from ".prisma/client";


interface Props {
    className?: string;
}

const SearchInput: React.FC<Props> = ({className}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const [products, setProducts] = useState<Product[]>([])
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useEffect(() => {
        Api.products.search(searchQuery).then((items) => {
            setProducts(items.products);
        });
    }, [searchQuery]);

    console.log(products);

    return (
        <>
            {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'/>}

            <div className='fixed top-0 bottom-0 right-0 bg-black/50 z-30' ref={ref}/>
            <div className="flex rounded-2xl flex-1 justify-between relative h-11 z-30">
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"/>
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Найти пиццу..."
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div
                    className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30', focused && 'visible opacity-100 top-12')}>
                    {products.map((product) => (
                            <Link href={`/products/${product.id}`} key={product.id}>
                                <div onClick={() => console.log(123)}
                                     className='px-3 py-2 hover:bg-primary/10 cursor-pointer flex items-center gap-3'>
                                    <img className='rounded-sm'
                                         src={product.imageUrl}
                                         width={32} height={32} alt={product.name}/>
                                    {product.name}
                                </div>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchInput;