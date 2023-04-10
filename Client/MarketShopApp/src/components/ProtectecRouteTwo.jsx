import React from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export const ProtectedRouteTwo = ({ isAllowed, children, redirectTo='/'}) => {
    if(isAllowed){
        cookies.remove('id_usr', {path: '/'})
        cookies.remove('name', {path: '/'})
        cookies.remove('name_usr', {path: '/'})
        cookies.remove('ema_usr', {path: '/'})
        cookies.remove('niv_acc', {path: '/'})
        window.location.href=`${redirectTo}`
    }
    return children ? children : <Outlet/>
}