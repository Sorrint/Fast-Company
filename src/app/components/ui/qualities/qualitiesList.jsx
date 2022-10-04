import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();
    const qualitiesList = qualities.map((quality) => getQuality(quality));
    if (!isLoading) {
        return (
            <>
                {qualitiesList.map((quality) => (
                    <Quality key={quality._id} color={quality.color} name={quality.name} id={quality._id} />
                ))}
            </>
        );
    } else {
        return 'Loading';
    }
};

export default QualitiesList;

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
