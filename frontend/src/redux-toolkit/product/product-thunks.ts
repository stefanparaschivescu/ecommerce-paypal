import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import {PRODUCTS, PRODUCTS_GRAPHQL_PRODUCT} from "../../constants/urlConstants";
import { getProductByQuery } from "../../utils/graphql-query/product-query";
import { FullProductResponse } from "../../types/types";

export const fetchProduct = createAsyncThunk<Partial<FullProductResponse>, string, { rejectValue: string }>(
    "product/fetchProduct",
    async (productId, thunkApi) => {
        try {
            const response = await RequestService.get(`${PRODUCTS}/${productId}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

// GraphQL thunks
export const fetchProductByQuery = createAsyncThunk<Partial<FullProductResponse>, string, { rejectValue: string }>(
    "product/fetchProductByQuery",
    async (productId, thunkApi) => {
        try {
            const response = await RequestService.post(PRODUCTS_GRAPHQL_PRODUCT, {
                query: getProductByQuery(productId)
            });
            return response.data.data.product;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
