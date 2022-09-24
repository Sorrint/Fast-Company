import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import { useHistory } from 'react-router-dom';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';

const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push(`${history.location.pathname}/edit`);
    };
    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard
                                name={user.name}
                                profession={user.profession.name}
                                editUser={handleClick}
                                id={user._id}
                                rate={user.rate}
                            />
                            <QualitiesCard qualities={user.qualities} />
                            <MeetingsCard completedMeetings={user.completedMeetings} />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default UserPage;

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
