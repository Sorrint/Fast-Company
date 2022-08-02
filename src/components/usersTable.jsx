import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UsersTable = ({ users, onSort, selectedSort, onToggleBookmark, onDelete }) => {
    const columns = {
        name: { path: 'name', name: 'Имя' },
        qualities: { name: 'Качества', component: (user) => <QualitiesList qualities={user.qualities} /> },
        professions: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => <Bookmark status={user.bookmark} onClick={() => onToggleBookmark(user._id)} />
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-secondary bg-danger btn-sm m-2"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />;
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default UsersTable;
