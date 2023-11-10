import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

import "./HomePageTheme.css";
import { MENU } from "../../../constants/routeConstants";

const HomePageTheme: FC = (): ReactElement => {
    return (
        <div className={"page-theme"}>
            <Row gutter={32}>
                <Col span={12}>
                    <Link to={{ pathname: MENU, state: { id: "all" } }}>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default HomePageTheme;
