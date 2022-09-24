import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';
import { QualitiesProvider } from './hooks/useQualities';

function App() {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <QualitiesProvider>
                    <Switch>
                        <Route path="/" exact component={Main}></Route>
                        <Route path="/login/:type?" component={Login}></Route>
                        <Route path="/users/:userId?/:userEdit?" component={Users}></Route>
                    </Switch>
                </QualitiesProvider>
            </ProfessionProvider>

            <ToastContainer />
        </>
    );
}

export default App;
