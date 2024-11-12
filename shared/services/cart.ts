import {instance} from './instance';
import {Cart, CartItem, Ingredient, Product} from ".prisma/client";
import {ProductItem} from "@prisma/client";

export type CartItemDTo = CartItem & {
    productItem: ProductItem & {
        product: Product;
    }
    ingredients: Ingredient[];
}

export interface CreateCartItemValues {
    productItemId: number;
    ingredients?: number[];
}

export interface CartDTO extends Cart {
    items: CartItemDTo[];
}

export const fetchCart = async (): Promise<CartDTO> => {
    return (await instance.get<CartDTO>('/cart')).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await instance.patch<CartDTO>('/cart/' + itemId, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await instance.delete<CartDTO>('/cart/' + id)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await instance.post<CartDTO>('/cart', values)).data;
};