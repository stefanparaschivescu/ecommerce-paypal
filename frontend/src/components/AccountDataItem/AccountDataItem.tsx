import React, { FC, ReactElement } from "react";
import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

type PropsType = {
    title: string;
    text?: string | string[] | number;
    isLink?: boolean
    link?: string
};

const AccountDataItem: FC<PropsType> = ({ title, text , isLink, link}): ReactElement => {
    return (
        <Row style={{ marginBottom: 8 }}>
            <Col span={8}>
                <Typography.Text strong>{title}</Typography.Text>
            </Col>
            <Col span={12}>
                {link ? (
                    <a href={link ?? ''}>
                        {text}
                    </a>
                ) : (
                    <Typography.Text>{text}</Typography.Text>
                )}
            </Col>
        </Row>
    );
};

export default AccountDataItem;
