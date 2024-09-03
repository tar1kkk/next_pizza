import React from 'react';
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";
import Categories from "@/components/shared/categories";
import SortPopUp from "@/components/shared/sortPopup";


interface Props {
    className?: string;
}

const TopBar: React.FC<Props> = ({className}) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
            <Container className='flex items-center justify-between'>
                <Categories/>
                <SortPopUp/>
            </Container>
        </div>
    );
};

export default TopBar;