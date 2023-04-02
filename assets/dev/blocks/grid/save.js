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
		className: `block__grid flex py-40 md:py-60`,
	} );

	const innerBlocksClasses = filterOutWhiteSpace( [
		'inner-blocks-wrapper relative justify-center',
		layout,
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
		<>
			<div { ...blockProps }>
				<div className="grid--inner">
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
