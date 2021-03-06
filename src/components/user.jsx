import React from 'react';
import Quality from './quality';
import Bookmark from './bookmark';
import PropTypes from 'prop-types';

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookmark
}) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>
                    {qualities.map((quality) => (
                        <Quality
                            key={quality._id}
                            color={quality.color}
                            name={quality.name}
                            id={quality._id}
                        />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate} /5</td>
                <td>
                    <Bookmark
                        status={bookmark}
                        onClick={() => onToggleBookmark(_id)}
                    />
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-secondary bg-danger btn-sm m-2"
                        onClick={() => onDelete(_id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    profession: PropTypes.object.isRequired,
    bookmark: PropTypes.bool.isRequired,
    qualities: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default User;
