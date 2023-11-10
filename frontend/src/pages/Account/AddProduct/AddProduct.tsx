import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { PlusSquareFilled, PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsProductAdded
} from "../../../redux-toolkit/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus } from "../../../types/types";
import { addProduct } from "../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AddFormInput from "./AddFormInput";
import AddFormSelect from "./AddFormSelect";
import IconButton from "../../../components/IconButton/IconButton";

type AddProductData = {
    productName: string;
    seller: string;
    year: string;
    country: string;
    type: string;
    price: string;
};

const AddProduct: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isProductAdded = useSelector(selectIsProductAdded);
    const ispProductLoading = useSelector(selectIsAdminStateLoading);
    const productErrors = useSelector(selectAdminStateErrors);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (isProductAdded) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Product added",
                description: "Product successfully added!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isProductAdded]);

    const onFormSubmit = (data: AddProductData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file",  file);
        bodyFormData.append(
            "product",
            new Blob([JSON.stringify({ ...data, productRating: 0 })], { type: "application/json" })
        );
        console.log(file);

        dispatch(addProduct(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <>
            <ContentTitle title={"Add product"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col span={12}>
                        <AddFormInput
                            title={"Product name"}
                            name={"productName"}
                            error={productErrors.productNameError}
                            disabled={ispProductLoading}
                            placeholder={"Enter the product name"}
                        />
                        <AddFormInput
                            title={"Release year"}
                            name={"year"}
                            error={productErrors.yearError}
                            disabled={ispProductLoading}
                            placeholder={"Enter the release year"}
                        />
                        <AddFormInput
                            title={"Product category"}
                            name={"type"}
                            error={productErrors.typeError}
                            placeholder={"Electronics"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Price"}
                            name={"price"}
                            error={productErrors.priceError}
                            placeholder={"Enter the price"}
                            disabled={ispProductLoading}
                        />
                    </Col>
                    <Col span={12}>
                        <AddFormInput
                            title={"Seller"}
                            name={"seller"}
                            error={productErrors.sellerError}
                            placeholder={"Enter seller name"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Country of origin"}
                            name={"country"}
                            error={productErrors.countryError}
                            placeholder={"Enter the country of origin"}
                            disabled={ispProductLoading}
                        />
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={"Add"} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddProduct;
