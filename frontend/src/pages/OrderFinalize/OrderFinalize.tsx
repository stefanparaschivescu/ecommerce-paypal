import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";

import { selectOrder } from "../../redux-toolkit/order/order-selector";
import { resetCartState } from "../../redux-toolkit/cart/cart-slice";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import Spinner from "../../components/Spinner/Spinner";

const OrderFinalize: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const order = useSelector(selectOrder);

    useEffect(() => {
        dispatch(resetCartState());
    }, []);

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            if (order.paypalUrl) {
                window.location.href = order.paypalUrl;
            }
        }, 2500);

        return () => clearTimeout(redirectTimeout);
    }, [order.paypalUrl])

    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <Typography.Title level={2}>Thank you for the order!</Typography.Title>
                <Typography.Text>Your order number is: {order.id}</Typography.Text>
                <Typography.Paragraph>Redirecting to Paypal...</Typography.Paragraph>
            </div>
            <Spinner />
        </ContentWrapper>
    );
};

export default OrderFinalize;
