import React from 'react';
import {cn} from "@/shared/lib/utils";
import {Container} from "./container";
import Image from "next/image";
import {Button} from "../ui";
import {User} from "lucide-react";
import Link from "next/link";
import SearchInput from "@/shared/components/shared/search-input";
import {CartButton} from "@/shared/components/shared/cart-button";

interface Props {
    className?: string;
}

const Header: React.FC<Props> = ({className}) => {
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

            <div className='mix-10 flex-1'>
                <SearchInput/>
            </div>
            {/* Right side*/}
            <div className='flex items-center gap-3'>
                <Button variant='outline' className='flex items-center gap-1'>
                    <User size={16}/>
                    Войти
                </Button>

                <div>
                    <CartButton/>
                </div>
            </div>
        </Container>
    );
};

export default Header;
