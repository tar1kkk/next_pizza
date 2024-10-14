import {instance} from './instance';
import {Cart, CartItem, Ingredient, Product} from ".prisma/client";
import {ProductItem} from "@prisma/client";
import axios from "axios";

export type CartItemDTo = CartItem & {
    productItem: ProductItem & {
        product: Product;
    }
    ingredients: Ingredient[];
}
export interface CreateCartItemValues {
    productItemId : number;
    ingredients?: number[];
    quantity: number;
}

export interface CartDTO extends Cart {
    items: CartItemDTo[];
}

export const fetchCart = async (): Promise<CartDTO> => {
    const {data} = await instance.get<CartDTO>('/cart');

    return data;
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
    const {data} = await instance.patch<CartDTO>('/cart' + id, {quantity});

    return data;
}
export const removeCartItem = async (id : number):Promise<CartDTO>=>{
    const {data} = await instance.delete<CartDTO>('/cart/' + id);

    return data;
}