import React, { useEffect, useState } from 'react';
import Users from './components/users';
import api from './api';

function App() {
    const [users, setUsers] = useState();
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((users) => users._id !== userId));
    };
    const handleToggleBookmark = (id) => {
        const updatedUsers = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    return (
        users && (
            <div>
                <Users users={users} onDelete={handleDelete} onToggleBookmark={handleToggleBookmark} />
            </div>
        )
    );
}

export default App;
