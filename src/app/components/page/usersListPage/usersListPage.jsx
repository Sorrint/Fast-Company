import React, { useState, useEffect } from 'react';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import PropTypes from 'prop-types';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import api from '../../../api';
import UsersTable from '../../ui/usersTable';
import _ from 'lodash';
import TextField from '../../common/form/textField';
import { useUser } from '../../../hooks/useUsers';

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const [searchName, setSearchName] = useState('');
    const pageSize = 8;

    const { users } = useUser();
    const handleDelete = (userId) => {
        // setUsers((prevState) => prevState.filter((users) => users._id !== userId));
        console.log(userId);
    };
    const handleToggleBookmark = (id) => {
        const updatedUsers = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(updatedUsers);
        console.log(updatedUsers);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchName]);

    const handleProfessionSelect = (selectedItem) => {
        setSearchName('');
        setSelectedProf(selectedItem);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        let filteredUsers;
        const search = new RegExp(searchName, 'gi');

        if (searchName) {
            filteredUsers = users.filter((user) => search.test(user.name));
        } else {
            filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;
        }
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        const handleSearch = (e) => {
            clearFilter();
            setSearchName(e.target.value);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <TextField onChange={handleSearch} value={searchName} name="search" placeholder="Search..." />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return 'loading...';
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;