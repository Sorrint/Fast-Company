import React, { useState, useEffect } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import { useHistory, useParams } from 'react-router-dom';
import BackHistoryButton from '../../common/backButton';
import { validator } from '../../../utils/validator';
import { useUser } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfession';
import { useQualities } from '../../../hooks/useQualities';
import MultiSelectField from '../../common/form/multiSelectField';
import { useAuth } from '../../../hooks/useAuth';

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();

    const { getUserById } = useUser();

    const { updateUserData } = useAuth();
    const [userData, setData] = useState();
    const { professions } = useProfessions();
    const professionsList = professions.map((p) => ({
        value: p._id,
        label: p.name
    }));

    const { qualities } = useQualities();
    const qualitiesList = qualities.map((p) => ({
        value: p._id,
        label: p.name
    }));

    useEffect(() => {
        const user = getUserById(userId);
        const userQualities = user.qualities.map((userQuality) => qualitiesList.find((q) => q.value === userQuality));
        setData(() => ({ ...user, qualities: userQualities }));
    }, []);

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email ввден некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Введите ваше имя'
            }
        }
    };
    const validate = () => {
        const errors = validator(userData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [userData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...userData, qualities: userData.qualities.map((q) => q.value) };
        try {
            await updateUserData(newData).then(() => history.push(`/users/${userData._id}`));
        } catch (error) {
            setErrors(error);
        }
    };

    const isValid = Object.keys(errors).length === 0;
    if (userData) {
        return (
            <>
                <div className="container mt-5">
                    <BackHistoryButton />
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя пользователя"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    name="profession"
                                    options={professionsList}
                                    onChange={handleChange}
                                    value={userData.profession}
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
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    defaultValue={userData.qualities}
                                    name="qualities"
                                    label="Выберите Ваши качества"
                                />
                                <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
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

export default EditUserPage;
