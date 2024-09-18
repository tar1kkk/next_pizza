import {Ingredient} from ".prisma/client";
import {useEffect, useState} from "react";
import {Api} from "@/services/api-client";

interface ReturnProps {
    items : Ingredient[];
}
export const useFilterIngredients = () : ReturnProps => {
    const [ingredients,setItems] = useState([]);
    useEffect(() => {
       async function fetchIngredients (){
           try {
               const ingredients = await Api.ingredients.getAll();
               setItems(ingredients);
           }catch (e){
               console.error(e)
           }
        }
        fetchIngredients()
    }, []);
    return {ingredients}
}