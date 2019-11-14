import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const LoggedInRoute = ({ component: Component, isAuthenticated, ...rest}) => {
    return(
        
        <Route {...rest} render={(props) => (
            !isAuthenticated 
            ? <Component {...props} {...rest} />
            : <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
        )} />
    )
}

export const ProtectedRoute = ({ component: Component, isAuthenticated, isVerified, ...rest}) => {

    return(

        <Route {...rest} render={(props) => (
            (isAuthenticated && isVerified)
            ? <Component {...props} {...rest} />
            : ((isAuthenticated && !isVerified)
                ? <Redirect to={{ pathname: "/verify", state: { from: props.location }}} />
                : <Redirect to={{ pathname: "/login", state: { from: props.location }}} />)
        )} />

    )
}


