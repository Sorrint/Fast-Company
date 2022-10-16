import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage/editUserPage';
import UserProvider from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';

const Users = () => {
    const { userId, userEdit } = useParams();
    const { currentUser } = useAuth();
    const editPage = () => {
        if (userId !== currentUser._id) {
            return <Redirect to={`/users/${currentUser._id}/edit`} />;
        }
        return <EditUserPage />;
    };
    return (
        <>
            <UserProvider>
                {userId ? userEdit && userEdit === 'edit' ? editPage() : <UserPage id={userId} /> : <UsersListPage />}
            </UserProvider>
        </>
    );
};

export default Users;
