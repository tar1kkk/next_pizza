import {useEffect} from "react";
import {useCartStore} from "@/shared/store/cart";

export const useCart = ()=> {
    const {totalAmount, fetchCartItems, items, updateItemQuantity, removeCartItem,loading,addCartItem} = useCartStore(state => ({
        totalAmount: state.totalAmount,
        fetchCartItems: state.fetchCartItems,
        updateItemQuantity: state.updateItemQuantity,
        items: state.items,
        removeCartItem: state.removeCartItem,
        loading : state.loading,
        addCartItem : state.addCartItem,
    }));

    useEffect(() => {
        fetchCartItems();
    }, []);

    return {totalAmount,fetchCartItems,items,updateItemQuantity,removeCartItem,loading,addCartItem};
}