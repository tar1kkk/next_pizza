import React from 'react';
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Title} from "@/components/shared/title";
import {Button} from "@/components/ui";
import {Plus} from "lucide-react";


interface Props {
    className?: string;
    id: number;
    price: number;
    imageUrl: string;
    name : string;
}

const ProductCard: React.FC<Props> = ({className,id,name,price,imageUrl}) => {
    return (
        <div className={cn('',className || '')}>
            <Link href='/product/1'>
                <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
                    <img className='w-[215px] h-[215px]' src={imageUrl} alt="logo"/>
                </div>

                <Title text={name} size='sm' className='mb-1 bt-3 font-bold'/>
                <p className='text-sm text-gray-400'>
                    Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
                </p>

                <div className='flex justify-between items-center mt-4'>
                    <span className='text-[20px]'>
                        от <b>{price} $</b>
                    </span>

                    <Button variant='secondary' className='text-base font-bold'>
                        <Plus size={20} className='mr-1'/>
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;