import React, {useEffect, useState} from "react";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {useSet} from "react-use";
import {getAvailablePizzaSizes} from "@/shared/lib/get-available-pizza-sizes";
import {ProductItem} from "@prisma/client";
import {Variant} from "@/shared/components/shared/group-variants";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    availableSizes : Variant[];
    currentItemId : number;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    selectedIngredients: Set<number>;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));
    const availableSizes = getAvailablePizzaSizes(items, type);

    const currentItemId = items.find((item)=> item.pizzaType === type && item.size === size)?.id;
    useEffect(() => {
        const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
        const availableSize = availableSizes?.find((item) => !item.disabled);

        console.log(!isAvailableSize && availableSize);
        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
        ;
    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        addIngredient,
        availableSizes,
        setSize,
        setType,
        currentItemId,
    }

}