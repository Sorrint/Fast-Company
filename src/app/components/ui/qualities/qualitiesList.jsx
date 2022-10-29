import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useDispatch, useSelector } from 'react-redux';
import { getQualitiesByIds, getQualitiesLoadingStatus, loadingQualitiesList } from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return 'Loading';
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    useEffect(() => {
        dispatch(loadingQualitiesList());
    }, []);

    return (
        <>
            {qualitiesList.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};

export default QualitiesList;

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
