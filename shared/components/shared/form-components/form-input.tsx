import {RequiredSymbol} from "@/shared/components/shared/required-symbol";
import {Input} from "@/shared/components/ui";
import {useFormContext} from "react-hook-form";
import {ErrorText} from "@/shared/components/shared/error-text";
import {ClearButton} from "@/shared/components/shared/clear-button";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({className, name, label, required, ...props}) => {
    const {register, formState: {errors}, watch, setValue} = useFormContext();
    const value = watch(name);
    const errorText = errors[name]?.message as string;
    const onClickClear = () => {
        setValue(name, '');
    }
    return (
        <div className={className}>
            {label && (
                <p className='font-medium mb-2'>
                    {label} {required && <RequiredSymbol/>}
                </p>
            )}

            <div className='relative'>
                <Input className='h-12 text-md' {...props} {...register(name)}/>
                {value && <ClearButton onClick={onClickClear}/>}
            </div>
            {errorText && <ErrorText text={errorText}/>}
        </div>
    )
}