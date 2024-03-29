import React, {useContext} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {publicRoutes, privateRoutes} from "./index";
import {AuthContext} from "../context";
import Loader from "../components/UI/loader/Loader";


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)


    if(isLoading){
        return <Loader/>
    }

    return (
        isAuth
        ? <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/posts'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}

                    />
                )}
                <Redirect to='/login '/>
            </Switch>

    );
};

export default AppRouter;