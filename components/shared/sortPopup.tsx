import React from 'react';
import {cn} from "@/lib/utils";
import {Popover} from "@/components/ui";
import {ArrowUpDown} from "lucide-react";


interface Props {
    className?: string;
}

const SortPopUp: React.FC<Props> = ({className}) => {
    return (
        <div className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
            <ArrowUpDown size={16}/>
            <b>Сортировка:</b>
            <b className='text-primary pl-1'>популярное</b>
        </div>
    );
};

export default SortPopUp;