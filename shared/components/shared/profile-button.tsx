import {signIn, useSession} from "next-auth/react";
import {CircleUser, User} from "lucide-react";
import {Button} from "@/shared/components/ui";
import React from "react";
import Link from "next/link";


interface Props {
    onClickLogin?: () => void;
    className?: string;
}

export const ProfileButton: React.FC<Props> = ({className,onClickLogin}) => {
    const {data: session} = useSession();
    return (
        <div className={className}>
            {
                !session ?
                    <Button onClick={onClickLogin} variant='outline' className='flex items-center gap-1'>
                        <User size={16}/>
                        Войти
                    </Button> :
                    <Link href='/profile'>
                        <Button variant='secondary' className='flex items-center gap-2'>
                            <CircleUser size={18}/>
                            Профиль
                        </Button>
                    </Link>
            }
        </div>
    )
}