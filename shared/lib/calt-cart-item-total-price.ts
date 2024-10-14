import {CartItemDTo} from "@/shared/services/cart";

export const caltCartItemTotalPrice = (item : CartItemDTo) : number => {
   const ingredientsPrice = item.ingredients.reduce((acc,next)=> acc + next.price,0);

   return (ingredientsPrice + item.productItem.price) * item.quantity;

}