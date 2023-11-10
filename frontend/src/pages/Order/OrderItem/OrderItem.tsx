import React, { FC, ReactElement } from "react";
import { Card, Col, Typography } from "antd";

import { ProductResponse } from "../../../types/types";
import "./OrderItem.css";

type PropsType = {
    product: ProductResponse;
    quantity?: number;
};

const OrderItem: FC<PropsType> = ({ product, quantity }): ReactElement => {
    return (
        <Col span={12}>
            <Card
                className={"menu-card"}
                cover={<img className={"menu-card-image"} alt={product.productName} src={product.filename} />}
            >
                <div className={"menu-content"}>
                    <Typography.Text strong>{product.seller}</Typography.Text>
                    <Typography.Text strong>{product.productName}</Typography.Text>
                    <Typography.Text strong>Price: $ {product.price}</Typography.Text>
                    <Typography.Text strong>Quantity: {quantity}</Typography.Text>
                </div>
            </Card>
        </Col>
    );
};

export default OrderItem;
