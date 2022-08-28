import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage/editUserPage';

const Users = () => {
    const { userId, userEdit } = useParams();
    return (
        <>
            {userId ? (
                userEdit && userEdit === 'edit' ? (
                    <EditUserPage id={userId} />
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
