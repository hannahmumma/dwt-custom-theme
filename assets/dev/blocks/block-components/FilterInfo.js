/**
 * React dependencies
 */

import React from 'react';

/**
 * DWT Dependencies
 */

const FilterInfo = ( { filterByOptionsFromParent, filterByFromParent } ) => {
	const label = filterByOptionsFromParent?.map( ( option ) => {
		if ( filterByFromParent === option.value ) {
			return option.label;
		}
	} );

	const filtered = label?.filter( ( item ) => item !== undefined );

	return (
		<div className='list-info flex items-center w-full h-full bg-light-gray p-40 text-center aspect-[81/100] max-w-[284px]'>
			<h4 className='heading-4 mt-0 mb-0 w-full'>{ filtered?.toString() }</h4>
		</div>

	);
};

export default FilterInfo;
