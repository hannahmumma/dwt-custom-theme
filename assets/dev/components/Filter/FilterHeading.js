import React, { useState } from 'react';

import { capitalizeFirstLetter } from '../../blocks/utils/general-utils';

/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const FilterHeading = ( { context, recordCount, error } ) => {
    const heading = capitalizeFirstLetter( context.featureBy );
	return (	
        <>	
            <h3 className='heading-3'>{ heading }</h3>
            <h4>{ error ? 0 : recordCount } { heading }</h4>
        </>
	);
};

export default FilterHeading;
