import {Ingredient} from ".prisma/client";
import {useEffect, useState} from "react";
import {Api} from "@/services/api-client";

interface ReturnProps {
    items : Ingredient[];
}
export const useFilterIngredients = () : ReturnProps => {
    const [ingredients,setItems] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
       async function fetchIngredients (){
           try {
               const ingredients = await Api.ingredients.getAll();
               setItems(ingredients);
               setLoading(false);
           }catch (e){
               console.error(e)
           }
        }
        fetchIngredients()
    }, []);
    return {ingredients,loading}
}