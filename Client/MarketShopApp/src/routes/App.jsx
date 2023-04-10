import React                            from 'react';
import { BrowserRouter, Routes, Route}  from 'react-router-dom';
import Layout                           from '@containers/Layout';
import Home                             from '@pages/Home';
import Login                            from '@pages/Login';
import { ProtectedRoute }               from '../components/ProtectecRoute';
import { ProtectedRouteTwo }               from '../components/ProtectecRouteTwo';
import {CreateAccount}                  from '@pages/CreateAccount';
import NotFound                         from '@pages/NotFound';
import CreateProduct                    from '@pages/CreateProduct';
import AppContext                       from '@context/AppContext';
import useInitialState                  from '@hooks/useInitialState';     
import                                       '@styles/global.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export const App =() => {
    

        var user ={ 
            id_usr:cookies.get('id_usr'),
            name:cookies.get('name'),
            name_usr:cookies.get('name_usr'),
            ema_usr:cookies.get('ema_usr'),
            niv_acc:cookies.get('niv_acc')
        }

    const initialState = useInitialState()
    return (
        <AppContext.Provider value={initialState}>

                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route element={<ProtectedRouteTwo isAllowed={user.id_usr}/>}>
                                <Route exact path="/" element={<CreateAccount/>}/>
                                <Route exact path="/login" element={<Login/>}/>
                            </Route>
                            <Route element={<ProtectedRoute isAllowed={!!user.id_usr}/>}>
                                <Route exact path="/home" element={<Home/>}/>
                            </Route>
                            <Route exact path="/create-product" element={
                                <ProtectedRoute isAllowed={!!user.id_usr && user.niv_acc.includes('admin')} redirectTo="/home">
                                    <CreateProduct/>
                                </ProtectedRoute>
                            } />
                            <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
        </AppContext.Provider>
    )
}

