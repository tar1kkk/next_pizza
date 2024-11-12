'use client'
import {zodResolver} from "@hookform/resolvers/zod";
import {formRegisterSchema} from "@/shared/components/shared/modals/forms/schema";
import {FormProvider, useForm} from "react-hook-form";
import {signOut} from "next-auth/react";
import toast from "react-hot-toast";
import {Container} from "@/shared/components/shared/container";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {FormInput} from "@/shared/components/shared/form-components/form-input";
import {updateUserInfo} from "@/app/actions";

interface ProfileFormProps {
    data: {
        id: number;
        fullName: string;
        email: string;
        password?: string;
    };
}

export const ProfileForm: React.FC<ProfileFormProps> = ({data}) => {
    const form = useForm({
            resolver: zodResolver(formRegisterSchema),
            defaultValues: {
                fullName: data.fullName,
                email: data.email,
                password: '',
                confirmPassword: '',
            }
        }
    );

    const onSubmit = async (data) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.error('Данные обновлены 📝', {
                icon: '✅',
            });
        } catch (error) {
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            });
        }
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/'
        });
    }
    return (
        <Container className='my-10'>
            <Title className='font-bold' size='md' text={`Личные данные | #${data.id}`}/>
            <FormProvider {...form}>
                <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name="email" label="E-Mail" required/>
                    <FormInput name="fullName" label="Полное имя" required/>

                    <FormInput type="password" name="password" label="Новый пароль" required/>
                    <FormInput type="password" name="confirmPassword" label="Повторите пароль" required/>

                    <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                        Сохранить
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button">
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );



}