/**
 * Module: Text with CTA
 * Parent Block(s):
 * - Image with Text
 */

/**
 * DWT dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';

/**
 * WP dependencies
 */

import { RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

const save = ( { attributes } ) => {
	const {
		layout,
		stackedAlignment,
		splitHeadingOrientation,
		backgroundColor,
		baseStyle,
		borderColor,
		borderStyle,
		borderColorFromImageWithText,
		layoutFromImageWithText,
		heading,
		headingColor,
		text,
		textColor,
	} = attributes;

	const bgColor = layoutFromImageWithText !== 'layered' && backgroundColor ? { backgroundColor } : undefined;
	const colorForBase = baseStyle ? { color: borderColor } : null;

	const blockProps = useBlockProps.save( {
		className: 'block__text-with-cta text-black w-full',
		style: { ...bgColor, ...colorForBase },

	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save(
		{ className: 'inner-blocks-wrapper' },
	);

	/**
	 * Heading base styles
	 */

	const base = baseStyle ? baseStyle : '';
	const isBumpUp = baseStyle === 'has-bump-up';
	const isCurved = baseStyle === 'has-curve';
	const curvedBaseWithBorder = ( isCurved && borderColor ) ? 'has-curved-border' : '';

	const blockWrapperClasses = filterOutWhiteSpace( [
		'block-wrapper',
		layout,
		stackedAlignment,
		splitHeadingOrientation,
		baseStyle,
		curvedBaseWithBorder,
		borderStyle,
	] );

	/**
	 * Handle element styles
	 */

	const hColor = headingColor ? { color: headingColor } : undefined;
	const tColor = textColor ? { color: textColor } : undefined;

	return (
		<div { ...blockProps }>
			<div className='text-with-cta--inner'>
				<div className={ blockWrapperClasses }>
					{ heading.length > 0 && (
						<RichText.Content
							className='heading-3 text-with-cta__heading text-black break-normal'
							style={ { ...hColor } }
							tagName='h3'
							value={ heading }
						/>
					) }

					{ text.length > 0 && (
						<RichText.Content
							className='paragraph-2 text-with-cta__text text-black break-normal'
							style={ { ...tColor } }
							tagName='p'
							value={ text }
						/>
					) }
					<div { ...innerBlocksProps }>
						{ children }
					</div>
				</div>
			</div>
		</div>
	);
};

export default save;
