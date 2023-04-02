/**
 * External dependencies
 */

/**
 * DWT dependencies
 */

import { filterOutWhiteSpace, capitalizeFirstLetter } from '../utils/general-utils';
import Breadcrumbs from '../block-components/Breadcrumbs';

/**
 * WP dependencies
 */

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { select } from '@wordpress/data';

const save = ( { attributes } ) => {

	const {
		featureBy,
		additionalFilterOptions,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `block__list-with-filters flex justify-center mt-25 mb-60`,
	} );

	const innerBlocksClasses = filterOutWhiteSpace( [
		'inner-blocks-wrapper',
	] );

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save( {
		className: innerBlocksClasses,
	} );

	/**
	 * Handle additional logic
	 */

	/**
	 * Handle element styles
	 */

	/**
	 * Handle element classes
	 */

	return (
		<div { ...blockProps }>
			<div className='list-with-filters--inner'>
				<div { ...innerBlocksProps }>
					{ children }
				</div>
			</div>
		</div>
	);
};

export default save;
