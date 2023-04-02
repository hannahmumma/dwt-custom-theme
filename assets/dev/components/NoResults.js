import React from 'react';

/**
 * No Results
 *
 * Use to display a message when no lists or search results are found
 */
const NoResults = ( { msg } ) => {
	return (
		<div className={ `no-results` }>
			<h2 className="heading-2">{ msg }</h2>
		</div>
	);
};

export default NoResults;
