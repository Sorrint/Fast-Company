import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/users.service';
import { toast } from 'react-toastify';

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState();
    const [isLoading, setLodaing] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLodaing(false);
        } catch (error) {
            errorCathcer(error);
        }
    }

    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }
    function errorCathcer(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>{!isLoading ? children : 'Loading'}</UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
