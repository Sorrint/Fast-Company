import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/users/:userId?" component={Users}></Route>
            </Switch>
        </>
    );
}

export default App;
