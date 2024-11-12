'use client'
import React, {useEffect, useRef} from 'react';
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import ProductCard from "@/shared/components/shared/product-card";
import {useIntersection} from "react-use";
import {useCategoryStore} from "@/shared/store/category";
import {Product} from ".prisma/client";

interface Props {
    className?: string;
    title: string;
    items: any[];
    listClassName?: string;
    categoryId: number;
}

const ProductsGroupList: React.FC<Props> = ({className, title, items, listClassName, categoryId}) => {
    const setActiveCategoryId = useCategoryStore(state => state.setActiveId);

    const intersectionRef: React.MutableRefObject<null> = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection?.isIntersecting, categoryId, title]);

    return (
        <div className={cn('', className)} id={title} ref={intersectionRef}>
            <Title text={title} size='lg' className='font-extrabold mb-5'/>
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items
                    .filter((product) => product.items.length > 0)
                    .map((product, idx) => (
                        <ProductCard key={product.id} id={product.id} price={product.items[0].price}
                                     imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients}/>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductsGroupList;