import React, { FC, ReactElement, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { BackTop } from "antd";

import {
    ACCOUNT,
    BASE,
    CART,
    LOGIN,
    OAUTH2_REDIRECT,
    ORDER,
    ORDER_FINALIZE,
    PRODUCT,
    REGISTRATION,
    MENU,
    ACCOUNT_USER_ORDERS
} from "./constants/routeConstants";
import { fetchCart } from "./redux-toolkit/cart/cart-thunks";
import { fetchUserInfo } from "./redux-toolkit/user/user-thunks";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Account from "./pages/Account/Account";
import OrderFinalize from "./pages/OrderFinalize/OrderFinalize";
import NavBar from "./components/NavBar/NavBar";
import OAuth2RedirectHandler from "./utils/oauth2/OAuth2RedirectHandler";
import "./App.css";
import ManageUserOrder from "./pages/Account/ManageUserOrder/ManageUserOrder";
import PersonalOrdersList from "./pages/Account/PersonalOrdersList/PersonalOrdersList";

const App: FC = (): ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
        const productsFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("products") as string)
        );
        dispatch(fetchCart(Array.from(productsFromLocalStorage.keys())));

        if (localStorage.getItem("token")) {
            dispatch(fetchUserInfo());
        }
    }, []);

    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path={BASE} component={Home} />
                <Route exact path={LOGIN} component={Login} />
                <Route exact path={MENU} component={Menu} />
                <Route exact path={`${PRODUCT}/:id`} component={Product} />
                <Route exact path={REGISTRATION} component={Registration} />
                <Route exact path={CART} component={Cart} />
                <Route exact path={ORDER} component={Order} />
                <Route exact path={ORDER_FINALIZE} component={OrderFinalize} />
                <Route path={OAUTH2_REDIRECT} component={OAuth2RedirectHandler} />
                <Route
                    path={`${ACCOUNT_USER_ORDERS}/:id`}
                    render={() =>
                        localStorage.getItem("token") ? <Route component={Account} /> : <Route component={ManageUserOrder} />
                    } />
                <Route
                    path={ACCOUNT_USER_ORDERS}
                    render={() =>
                        localStorage.getItem("token") ? <Route component={Account} /> : <Route component={Home} />
                    }
                />
                <Route
                    path={ACCOUNT}
                    render={() =>
                        localStorage.getItem("token") ? <Route component={Account} /> : <Route component={Home} />
                    }
                />
                <Route path="*" component={Home} />
            </Switch>
            <BackTop />
        </>
    );
};

export default App;
