import {pizzaSizes, PizzaType} from "@/shared/constants/pizza";
import {ProductItem} from "@prisma/client";
import {VariantProps} from "class-variance-authority";
import {Variant} from "@/shared/components/shared/group-variants";


export const getAvailablePizzaSizes = (items: ProductItem[], type: PizzaType) : Variant[] => {
    const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
    }));
}