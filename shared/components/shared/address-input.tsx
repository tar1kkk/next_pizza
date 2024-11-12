import React, { useEffect, useState } from "react";
import { RequiredSymbol } from "@/shared/components/shared/required-symbol";
import { Input } from "@/shared/components/ui";
import { useFormContext } from "react-hook-form";
import { ErrorText } from "@/shared/components/shared/error-text";
import { ClearButton } from "@/shared/components/shared/clear-button";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const AddressInput: React.FC<FormInputProps> = ({
                                                           className,
                                                           name,
                                                           label,
                                                           required,
                                                           onChange,
                                                           ...props
                                                       }) => {
    const { register, formState: { errors }, watch, setValue } = useFormContext();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const address = watch(name) as string || ""; // Убедитесь, что значение по умолчанию - пустая строка
    const errorText = errors[name]?.message as string;

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (address.length > 2) {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?country=Украина&street=${address}&format=json`
                    );
                    const data = await response.json();
                    const addresses = data.map((item: any) => item.display_name);
                    setSuggestions(addresses);
                } catch (error) {
                    console.error("Error fetching address suggestions:", error);
                }
            } else {
                setSuggestions([]);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [address]);

    const handleSelectSuggestion = (suggestion: string) => {
        setValue(name, suggestion);
        setSuggestions([]);
        onChange?.(suggestion);
    };

    const onClickClear = () => {
        setValue(name, "");
        setSuggestions([]);
    };

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input
                    value={address}
                    {...props}
                    {...register(name)}
                    onChange={(e) => {
                        setValue(name, e.target.value);
                        setSuggestions([]); // Очищаем подсказки при новом вводе
                    }}
                    className="h-12 text-md w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    placeholder="Введите адрес"
                />
                {address && <ClearButton onClick={onClickClear} />}
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelectSuggestion(suggestion)}
                                className="px-3 py-2 cursor-pointer border hover:bg-gray-100"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {errorText && <ErrorText text={errorText} />}
        </div>
    );
};
