import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useParams } from 'react-router-dom';
import CommentsList from '../common/comments/commentsList';
import AddCommentsForm from '../common/comments/addCommentsForm';
import _ from 'lodash';

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState();

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        api.comments.add({ ...data, pageId: userId }).then((data) => setComments([...comments, data]));
    };

    const handleCommentRemove = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((comment) => comment._id !== id));
        });
    };

    const sortedComments = _.orderBy(comments, ['created_at'], 'desc');
    return (
        <>
            {comments && (
                <>
                    <div className="card mb-2">
                        <div className="card-body">
                            <AddCommentsForm onSubmit={handleSubmit} />
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2>Comments</h2>
                            <hr />
                            <CommentsList comments={sortedComments} onRemove={handleCommentRemove} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
export default Comments;
