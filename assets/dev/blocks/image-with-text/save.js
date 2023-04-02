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
		borderColor,
		textWithButtonBackgroundColor,
	} = attributes;

	/**
	 * Block settings/styles
	 */

	const blockProps = useBlockProps.save( {
		className: 'block__image-with-text',
	} );

	/**
	 * Inner blocks settings/styles
	 */

	const is5050 = layout === '50-50' ? 'is-50-50' : '';
	const is6040 = layout === '40-60' ? 'is-40-60' : '';
	const isLayered = layout === 'layered' ? 'is-layered' : '';

	const layoutClasses = filterOutWhiteSpace( [
		is5050,
		is6040,
		isLayered,
	] );

	const borderBottomColor = borderColor && layout !== 'layered' ? { borderBottomColor: borderColor } : undefined;
	const borderBottomWidth = borderColor && layout !== 'layered' ? { borderBottomWidth: '6px' } : undefined;

	// For layered layout we need to grab the background color from the text with cta block and apply it to the row which contains the featured image block
	// We also need to set the color property of inner-blocks-wrapper to the value of the block's border so we can apply that to the layered border
	const layeredBgColor = textWithButtonBackgroundColor && isLayered ? { backgroundColor: textWithButtonBackgroundColor } : undefined;
	const layeredBorderColor = borderColor && isLayered ? { color: borderColor } : undefined;

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save( {
		className: `inner-blocks-wrapper relative ${ layoutClasses }`,
	} );

	return (
		<div { ...blockProps }>
			<div className={ `image-with-text--inner ${ borderColor ? 'has-border' : '' }` } style={ { ...borderBottomColor, ...borderBottomWidth, ...layeredBgColor, ...layeredBorderColor } }>
				<div { ...innerBlocksProps }>
					{ children }
				</div>
			</div>
		</div>
	);
};

export default save;
