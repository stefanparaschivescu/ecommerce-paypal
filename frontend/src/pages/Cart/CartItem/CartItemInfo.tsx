import React, { FC, memo, ReactElement } from "react";
import { Col, Typography } from "antd";

import { ProductResponse } from "../../../types/types";

type PropsType = {
    product: ProductResponse;
};

const CartItemInfo: FC<PropsType> = memo(({ product }): ReactElement => {

    return (
        <>
            <Col span={8} className={"cart-item-image"}>
                <img src={product.filename} alt={product.productName} style={{ height: 100 }} />
            </Col>
            <Col span={8}>
                <Typography.Title level={3}>{product.seller}</Typography.Title>
                <Typography.Title level={5}>{product.productName}</Typography.Title>
                <Typography.Text strong>{product.productRating} stars</Typography.Text>
            </Col>
        </>
    );
});

export default CartItemInfo;
