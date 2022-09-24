import React from 'react';
import PropTypes from 'prop-types';

const Quality = ({ color, name, id }) => {
    return (
        <span key={id} className={`badge bg-${color} m-1`}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default Quality;
