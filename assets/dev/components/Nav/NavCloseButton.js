/**
 * React dependencies
 */

import React from 'react';

/**
 * Nav Open and Close Buttons
 * A component to display the close button based on conditions
 *
 * Current usage:
 * - Nav
 * - NavSearchBar
 *
 * @param {Object} props
 * @param {Object} props.closeButtonCondition
 * @param {string} props.closeButtonClassNames
 * @param {Object} props.closeIcon
 * @param {Object} props.handleOpenClose
 */
const NavCloseButton = ( {
	closeButtonCondition,
	closeButtonClassNames,
	closeIcon,
	handleOpenClose,
} ) => {
	return (
		closeButtonCondition && (
			<button
				className={ closeButtonClassNames }
				type='button'
				onClick={ handleOpenClose }
			>
				{ closeIcon }
			</button>
		)
	);
};

export default NavCloseButton;
