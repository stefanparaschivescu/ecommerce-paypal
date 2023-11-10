import React, { FC, ReactElement } from "react";
import { Button, Col, Divider, Rate, Row, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Description from "./Description/Description";
import { FullProductResponse } from "../../../types/types";

type PropsType = {
    product?: Partial<FullProductResponse>;
    addToCart: () => void;
};

const ProductInfo: FC<PropsType> = ({ product, addToCart }): ReactElement => {
    return (
        <Row>
            <Col span={12} className={"product-image-wrapper"}>
                <img src={product?.filename} alt={product?.productName} className={"product-image"} />
            </Col>
            <Col span={12}>
                <Row className={"product-header"}>
                    <Col>
                        <Typography.Title level={3}>{product?.productName}</Typography.Title>
                        <Typography.Title level={4}>{product?.seller}</Typography.Title>
                        <Typography.Text>{product?.type}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Typography.Text type="success">In Stock</Typography.Text>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <Col span={5}>
                        <Space align={"baseline"}>
                            <Typography.Text>${product?.price}.00</Typography.Text>
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Button icon={<ShoppingCartOutlined />} onClick={addToCart}>
                            Add to cart
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <Description title={"Country of origin:"} />
                        <Description title={"Release year:"} />
                    </Col>
                    <Col span={16}>
                        <Description title={product?.country} />
                        <Description title={product?.year} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ProductInfo;
