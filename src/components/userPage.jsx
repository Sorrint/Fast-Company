import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import { useHistory } from 'react-router-dom';
import QualitiesList from './qualitiesList';

const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const handleReturn = () => {
        history.replace('/users');
    };
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <h3>completedMeetings: {user.completedMeetings}</h3>
                <QualitiesList qualities={user.qualities} />
                <h2>Rate: {user.rate}</h2>
                <button className="btn btn-outline-primary" onClick={() => handleReturn()}>
                    Все пользователи
                </button>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default UserPage;

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
