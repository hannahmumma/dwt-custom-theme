/**
 * React dependencies
 */

import React from 'react';

/**
 * Nav Open and Close Buttons
 * A component to display open and close buttons based on conditions
 *
 * Current usage:
 * - Nav
 * - NavSearchBar
 *
 * @param {Object} props
 * @param {Object} props.openButtonCondition
 * @param {string} props.openButtonClassNames
 * @param {Object} props.openIcon
 * @param {Object} props.handleOpenClose
 */
const NavOpenButton = ( {
	openButtonCondition,
	openButtonClassNames,
	openIcon,
	handleOpenClose,
} ) => {
	return (
		openButtonCondition && (
			<button
				className={ openButtonClassNames }
				type='button'
				onClick={ handleOpenClose }
			>
				{ openIcon }
			</button>
		)
	);
};

export default NavOpenButton;
