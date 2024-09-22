import {useEffect, useState} from "react";
import {Api} from "@/services/api-client";
import {Ingredient} from ".prisma/client";

export const useIngredients = () => {
    const [ingredients, setItems] = useState<Ingredient>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const ingredients = await Api.ingredients.getAll();
                setItems(ingredients);
                setLoading(false);
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients()
    }, []);
    return {ingredients, loading};
}