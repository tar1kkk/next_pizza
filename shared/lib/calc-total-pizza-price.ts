import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {ProductItem} from "@prisma/client";
import {Ingredient} from ".prisma/client";

/**
 * Функция для подсчета общей стоимости пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param type - тип выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param selectedIngredients - выбранные ингредиенты
 * @returns общую стоимость
 */
export const calcTotalPizzaPrice = (
    items: ProductItem[],
    ingredients: Ingredient[],
    type: PizzaType,
    size: PizzaSize,
    selectedIngredients: Set<number>
) => {
    const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
    const totalPrice = ingredients
        .filter(item => selectedIngredients.has(item.id))
        .reduce((acc, next) => acc + next.price, pizzaPrice);
    return totalPrice;
}