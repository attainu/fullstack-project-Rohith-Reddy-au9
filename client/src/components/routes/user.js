import React from 'react';
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoadingPage from "./loadingPage";


const UserRoute = ({children, ...rest}) => {
    const {user } = useSelector((state) => ({...state}))
    return user && user.token ? (
        <Route {...rest} render={()=>children} />
    ) : 
    (
        <LoadingPage />
    )
}

export default UserRoute