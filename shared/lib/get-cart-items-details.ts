import {mapPizzaType, PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {CartStateItem} from "@/shared/store/cart";

export const getCartItemsDetails = (
    ingredients: CartStateItem['ingredients'],
    pizzaType?: PizzaType,
    pizzaSize?: PizzaSize,
): string => {
    const details = [];

    if(pizzaSize){
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} ${pizzaSize} см`);
    }

    if(ingredients){
        details.push(...ingredients.map((ingredient)=> ingredient.name));
    }
    return details.join(', ');
}