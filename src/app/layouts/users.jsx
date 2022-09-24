import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage/editUserPage';
import UserProvider from '../hooks/useUsers';

const Users = () => {
    const { userId, userEdit } = useParams();
    return (
        <>
            <UserProvider>
                {userId ? (
                    userEdit && userEdit === 'edit' ? (
                        <EditUserPage id={userId} />
                    ) : (
                        <UserPage id={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
