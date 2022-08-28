import React, { useEffect, useState } from 'react';
import api from '../../../api';
import PropTypes from 'prop-types';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { useHistory } from 'react-router-dom';

const UserPageEdit = ({ id }) => {
    const history = useHistory();
    const [userData, setUserData] = useState();
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUserData(data);
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id,
                key: professionName
            }));
            setProfession(professionsList);
        });

        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color,
                key: optionName
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        if (target.name === 'profession') {
            const professionData = professions.find((profession) => profession.value === target.value);
            target.value = { _id: professionData.value, name: professionData.label };
        }
        if (target.name === 'qualities') {
            const qualitiesData = target.value.map((userQuality) => ({
                _id: userQuality.value,
                name: userQuality.label,
                color: userQuality.color
            }));
            target.value = [...qualitiesData];
        }
        setUserData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users.update(id, userData);
        history.replace(`/users/${id}`);
    };
    if (userData && professions) {
        return (
            <>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя пользователя"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    name="profession"
                                    options={professions}
                                    onChange={handleChange}
                                    value={userData.profession._id}
                                    defaultOption="Choose..."
                                />
                                <RadioField
                                    options={[
                                        { name: 'Male', value: 'male' },
                                        { name: 'Female', value: 'female' },
                                        { name: 'Other', value: 'other' }
                                    ]}
                                    label="Выберите Ваш пол"
                                    name="sex"
                                    value={userData.sex}
                                    onChange={handleChange}
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={userData.qualities.map((userQuality) =>
                                        qualities.find((quality) => (quality.value === userQuality._id ? quality : ''))
                                    )}
                                    name="qualities"
                                    label="Выберите Ваши качества"
                                />
                                <button type="submit" className="btn btn-primary w-100 mx-auto">
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h1>Loading</h1>
                    </div>
                </div>
            </div>
        );
    }
};

UserPageEdit.propTypes = {
    id: PropTypes.string
};

export default UserPageEdit;
