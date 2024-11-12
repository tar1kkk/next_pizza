'use client'
import React, {useEffect, useState} from 'react';
import {cn} from "@/shared/lib/utils";
import {Container} from "./container";
import Image from "next/image";

import Link from "next/link";
import SearchInput from "@/shared/components/shared/search-input";
import {CartButton} from "@/shared/components/shared/cart-button";
import {ProfileButton} from "@/shared/components/shared/profile-button";
import {AuthModal} from "@/shared/components/shared/modals/auth-modal";
import {useSearchParam} from "react-use";
import {useSearchParams} from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    hasSearch? : boolean;
    hasCart? : boolean;
    className?: string;
}

const Header: React.FC<Props> = ({className,hasSearch = true,hasCart = true}) => {
    const [open,setOpen] = useState(false);

    const searchParams = useSearchParams();
    useEffect(() => {
        if(searchParams.has('verified')){
            setTimeout(()=>{
                toast.success('Аккаунт успешно подтвержден');
            },500)
        }
    }, []);

    return (
        <Container className={cn(className || '', 'flex items-center justify-between py-12')}>
            {/* Left side*/}
            <Link href='/'>
                <div className='flex items-center gap-4'>
                    <Image src='/logo.png' alt='logo' width={35} height={35}/>
                    <div>
                        <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
                        <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                    </div>
                </div>
            </Link>

            {hasSearch && <div className='mx-10 flex-1'>
                <SearchInput/>
            </div>}
            {/* Right side*/}
            <div className='flex items-center gap-3'>
                <AuthModal open={open} onClose={()=> setOpen(false)}/>
                <ProfileButton onClickLogin={()=> setOpen(true)}/>
                {hasCart && <div>
                    <CartButton/>
                </div>}
            </div>
        </Container>
    );
};

export default Header;
