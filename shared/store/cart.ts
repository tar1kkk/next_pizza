import {create} from "zustand";
import {Api} from "@/shared/services/api-client";
import {getCartDetails} from "@/shared/lib/get-cart-details.";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;

    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    /* Запрос на добавление товара в корзину */
    addCartItem: (values: any) => Promise<void>;

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,
    fetchCartItems: async () => {
        try {
            set({loading: true, error: false});
            const data = await Api.cart.fetchCart();
            set(getCartDetails(data));
        } catch (e) {
            console.log(e);
            set({e: true});
        } finally {
            set({loading: false});
        }
    },


    removeCartItem: async (id: number) => {
        try {
            set({loading: true, error: false});
            const data = await Api.cart.removeCartItem(id);
            set(getCartDetails(data));
        } catch (e) {
            console.log(e);
            set({e: true});
        } finally {
            set({loading: false});
        }
    },
    updateItemQuantity : async (id : number,quantity : number)=> {
        try {
            set({loading: true, error: false});
            const data = await Api.cart.updateItemQuantity(id,quantity)
            set(getCartDetails(data));
        } catch (e) {
            console.log(e);
            set({e: true});
        } finally {
            set({loading: false});
        }
    },
    addCartItem : async (values : any)=> {}
}));