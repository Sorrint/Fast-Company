import React from 'react';
import PropTypes from 'prop-types';
import { displayDate } from '../../../utils/displayDate';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../../store/users';

const Comment = ({ content, created_at: created, pageId, userId, _id: id, onRemove }) => {
    const user = useSelector(getUserById(userId));
    const currentUserId = useSelector(getCurrentUserId());
    return (
        <div className="bg-light card-body mb-3" key={id}>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {user && user.name}
                                        <span className="small">{displayDate(created)}</span>
                                    </p>
                                    {currentUserId === userId && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0" key={id}>
                                    {content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;

Comment.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pageId: PropTypes.string,
    userId: PropTypes.string,
    _id: PropTypes.string,
    onRemove: PropTypes.func
};
