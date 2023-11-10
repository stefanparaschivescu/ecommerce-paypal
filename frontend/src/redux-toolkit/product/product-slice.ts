import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FullProductResponse, LoadingStatus } from "../../types/types";
import { fetchProduct, fetchProductByQuery } from "./product-thunks";

export interface ProductState {
    product: Partial<FullProductResponse>;
    errorMessage: string;
    loadingState: LoadingStatus;
}

export const initialState: ProductState = {
    product: {},
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct(state, action: PayloadAction<FullProductResponse>) {
            state.product = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        resetProductState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
        builder.addCase(fetchProductByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchProductByQuery.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchProductByQuery.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
    }
});

export const { setProduct, resetProductState } = productSlice.actions;
export default productSlice.reducer;
