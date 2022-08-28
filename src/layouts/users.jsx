import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import UserPageEdit from '../components/page/userPageEdit';

const Users = () => {
    const { userId, userEdit } = useParams();
    return (
        <>
            {userId ? (
                userEdit && userEdit === 'edit' ? (
                    <UserPageEdit id={userId} />
                ) : (
                    <UserPage id={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
