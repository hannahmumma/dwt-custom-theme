/**
 * Module: Carousel
 *
 * Automatic and manual carousels are being handled by React.
 *
 * @see Book list module for the setup and Carousel.js in components folder
 */

/**
 * External dependencies
 */

/**
 * DWT dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';

/**
 * WP dependencies
 */

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		layout,
		horizontalRule,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `block__carousel justify-center py-80`,
	} );

	const innerBlocksClasses = filterOutWhiteSpace(
		[
			'inner-blocks-wrapper relative',
			layout,
		]
	);

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
		<>
			<div { ...blockProps }>
				<div className="carousel--inner">
					<div { ...innerBlocksProps }>
						{ children }
					</div>
				</div>
			</div>
			{ horizontalRule && (
				<hr style={ { border: '1px solid' } } />
			) }
		</>
	);
};

export default save;
