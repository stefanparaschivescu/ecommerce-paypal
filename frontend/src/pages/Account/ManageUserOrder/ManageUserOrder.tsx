import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useLocation, useParams} from "react-router-dom";
import { Card, Col, Row, Table } from "antd";
import { InfoCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

import {
    selectIsOrderLoaded,
    selectIsOrderLoading,
    selectOrder,
    selectOrderItems
} from "../../../redux-toolkit/order/order-selector";
import {
    fetchOrderById,
    fetchOrderByPaymentId,
    fetchOrderItemsByOrderId
} from "../../../redux-toolkit/order/order-thunks";
import { resetOrderState } from "../../../redux-toolkit/order/order-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import Spinner from "../../../components/Spinner/Spinner";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { OrderItemResponse } from "../../../types/types";
import "./ManageUserOrder.css";

const ManageUserOrder: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const order = useSelector(selectOrder);
    const orderItems = useSelector(selectOrderItems);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const isOrderLoaded = useSelector(selectIsOrderLoaded);
    const { id, email, firstName, lastName,
        totalPrice, postIndex, phoneNumber, date,
        city, address, isPaid, paypalOrderId, paypalUrl } = order;
    const paymentId = new URLSearchParams(useLocation().search).get('paymentId');

    useEffect(() => {
        if (params.id !== 'payment') {
            dispatch(fetchOrderById(params.id));

        } else if (paymentId) {
            dispatch(fetchOrderByPaymentId(paymentId));
        }
        return () => {
            dispatch(resetOrderState());
        };
    }, []);

    useEffect(() => {
        if (isOrderLoaded && order && order.id) {
            dispatch(fetchOrderItemsByOrderId(order.id.toString()));
        }
    }, [isOrderLoaded]);

    return (
        <>
            {isOrderLoading ? (
                <Spinner />
            ) : (
                <>
                    <div style={{ textAlign: "center" }}>
                        <ContentTitle title={`Order #${id}`} titleLevel={4} icon={<ShoppingOutlined />} />
                    </div>
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={32}>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={"Customer information"} titleLevel={5} />
                                        <AccountDataItem title={"First name"} text={firstName} />
                                        <AccountDataItem title={"Last name"} text={lastName} />
                                        <AccountDataItem title={"City"} text={city} />
                                        <AccountDataItem title={"Address"} text={address} />
                                        <AccountDataItem title={"Email"} text={email} />
                                        <AccountDataItem title={"Phone number"} text={phoneNumber} />
                                        <AccountDataItem title={"Zip code"} text={postIndex} />
                                    </Col>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={"Order information"} titleLevel={5} />
                                        <AccountDataItem title={"Order id"} text={id} />
                                        <AccountDataItem title={"Date"} text={date} />
                                        <AccountDataItem title={"Payment status"} text={isPaid ? 'ORDER PAID' : 'PAYMENT PENDING/PAYMENT FAILED'} />
                                        <AccountDataItem title={"Paypal Order ID"} text={paypalOrderId} />
                                        {!isPaid ? (<AccountDataItem title={"PayPal Checkout"} text={'Pay your order here'} link={paypalUrl} />) : null}
                                        <ContentTitle title={`Order summary: ${totalPrice}.0 $`} titleLevel={4} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 16 }}>
                                    <Col span={24}>
                                        <Table
                                            rowKey={"id"}
                                            pagination={false}
                                            dataSource={orderItems}
                                            columns={[
                                                {
                                                    title: "Product Id",
                                                    dataIndex: "id",
                                                    key: "id"
                                                },
                                                {
                                                    title: "Product Seller",
                                                    dataIndex: "seller",
                                                    key: "seller",
                                                    render: (_, order: OrderItemResponse) => order.product.seller
                                                },
                                                {
                                                    title: "Product Name",
                                                    dataIndex: "productName",
                                                    key: "productName",
                                                    render: (_, order: OrderItemResponse) => order.product.productName
                                                },
                                                {
                                                    title: "Quantity",
                                                    dataIndex: "quantity",
                                                    key: "quantity"
                                                },
                                                {
                                                    title: "Price",
                                                    dataIndex: "price",
                                                    key: "price",
                                                    render: (_, order: OrderItemResponse) => `${order.product.price}.0 $`
                                                },
                                                {
                                                    title: "Amount",
                                                    dataIndex: "amount",
                                                    key: "amount",
                                                    render: (_, order: OrderItemResponse) => `${order.amount}.0 $`
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUserOrder;
