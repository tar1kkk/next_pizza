import {useEffect} from "react";
import qs from "qs";
import {useRouter} from "next/navigation";

export const useQueryFilters = (selectedIngredients, sizes, pizzaTypes, price) => {
    const router = useRouter();


    useEffect(() => {
        const filters = {
            ...price,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngredients),
        };

        const query = qs.stringify(filters, {
            arrayFormat: 'comma',
        });
        router.push(`?${query}`, {
            scroll: false,
        });
    }, [price, pizzaTypes, sizes, selectedIngredients, router]);
}