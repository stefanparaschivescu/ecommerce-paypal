import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import {
    selectIsProductLoaded,
    selectIsProductLoading,
    selectProduct,
    selectProductError,
    selectProductErrorMessage,
} from "../../redux-toolkit/product/product-selector";
import { fetchProduct } from "../../redux-toolkit/product/product-thunks";
import { resetInputForm } from "../../redux-toolkit/user/user-slice";
import { resetProductState } from "../../redux-toolkit/product/product-slice";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ProductInfo from "./ProductInfo/ProductInfo";
import { useCart } from "../../hooks/useCart";
import "./Product.css";

let stompClient: CompatClient | null = null;

const Product: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const product = useSelector(selectProduct);
    const isProductLoading = useSelector(selectIsProductLoading);
    const isProductLoaded = useSelector(selectIsProductLoaded);
    const isProductError = useSelector(selectProductError);
    const errorMessage = useSelector(selectProductErrorMessage);
    const { addToCart } = useCart(product?.id!);

    useEffect(() => {
        // GraphQL example
        // dispatch(fetchProductByQuery(params.id));
        dispatch(fetchProduct(params.id));
        dispatch(resetInputForm());
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetProductState());
        };
    }, []);



    return (
        <ContentWrapper>
            {isProductLoading ? (
                <Spinner />
            ) : (
                <>
                    {isProductError ? (
                        <ErrorMessage errorMessage={errorMessage} />
                    ) : (
                        <>
                            <ProductInfo product={product} addToCart={addToCart} />
                        </>
                    )}
                </>
            )}
        </ContentWrapper>
    );
};

export default Product;
