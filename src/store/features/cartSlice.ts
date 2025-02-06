import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartPayload, GetAllProductyPayload } from "@/api/product/types";
import { toast } from "@/hooks/use-toast";
import { RootState } from "..";

interface CartState {
    items: CartPayload[];
}

const initialState: CartState = {
    items: [],
};

export const totalQuantity = (state: RootState) => {
    return state.cart?.items.reduce((total: number, item: CartPayload) => total + (item.quantity || 0), 0)
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<GetAllProductyPayload>) => {
            console.log("clicking");
            if (!action.payload.productID) return;

            const item = state.items.find(
                item => item.productID === action.payload.productID
            );

            if (item && item?.quantity < action.payload.stock) {
                item.quantity += 1;
            } else if (item?.quantity === action.payload.stock) {
                toast({
                    title: "Exceeds Available Stock",
                    description: "Cannot add more",
                    variant: "destructive",
                  });
                  return;
            } else {
                const items: CartPayload = {
                    ...action.payload,
                    quantity: 1,
                };
                console.log(items);
                state.items.push(items);
            }
            toast({
                title: "Success",
                description: "Product added to Cart",
            });
        },
        decrementQuantity: (state, action: PayloadAction<CartPayload>) => {
            let item = state.items.find(
                item => item.productID === action.payload.productID
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                toast({
                    title: "Success",
                    description: "Product Decrease to Cart"
                });
            } else {
                state.items = state.items.filter(
                    item => item.productID !== action.payload.productID
                );
            }
        },
        increaseQuantity: (state, action: PayloadAction<CartPayload>) => {
            const item = state.items.find(
                item => item.productID === action.payload.productID
            );
            if (item && item.quantity < action.payload.stock) {
                item.quantity += 1;
            } else if (item?.quantity === action.payload.stock) {
                toast({
                    title: "Stock Limit Reached",
                    description: "You have reached the stock limit for this product",
                    variant: "destructive",
                });
                return;
            } else {
                const items: CartPayload = {
                    ...action.payload,
                    quantity: 1,
                };
                state.items.push(items);
                // console.log(items);
            }
            toast({
                title: "Success",
                description: "Product Increase to Cart"
            });
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.productID !== action.payload
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, decrementQuantity, increaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;