import { useSearchParams} from "next/navigation";
import {useSet} from "react-use";
import {useState} from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaType: string;
    sizes: string;
    ingredients: string;
}

export const useFilters = () => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    // фильтр ингредиентов
    const [selectedIngredients, {toggle: toggleIngredients}] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));
    // фильтр размеров
    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>
    (searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []));
    // фильтр типа пиццы
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));
    // фильтр стоимости
    const [price, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });
    const onChangePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...price,
            [name]: value,
        })
    }
    return {
        selectedIngredients,
        sizes,
        pizzaTypes,
        price,
        setPrice,
        setPizzaTypes: togglePizzaTypes,
        setSize: toggleSizes,
        onAddId : toggleIngredients,
        onChangePrice
    }
}