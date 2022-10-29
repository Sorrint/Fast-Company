import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import { useDispatch } from 'react-redux';
import { loadingQualitiesList } from './store/qualities';
import { loadingProfessionsList } from './store/professions';
import { loadingUsersList } from './store/users';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadingQualitiesList());
        dispatch(loadingProfessionsList());
        dispatch(loadingUsersList());
    }, []);
    return (
        <>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:userEdit?" component={Users}></ProtectedRoute>
                    <Route path="/" exact component={Main}></Route>
                    <Route path="/login/:type?" component={Login}></Route>
                    <Route path="/logout" component={LogOut}></Route>
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
