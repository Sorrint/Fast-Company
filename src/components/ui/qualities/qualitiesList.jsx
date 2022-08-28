import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality._id} color={quality.color} name={quality.name} id={quality._id} />
            ))}
        </>
    );
};

export default QualitiesList;

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
