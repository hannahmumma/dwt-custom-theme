/**
 * External dependencies
 */
import isEmpty from 'lodash/isEmpty';

/**
 * DWT dependencies
 */
import { filterOutWhiteSpace } from '../utils/general-utils';
import Placeholder from '../block-components/Placeholder';

/**
 * WP dependencies
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		borderColor,
		borderStyle,
		baseStyle,
		backgroundColor,
		heading,
		headingColor,
		text,
		textColor,
		layoutStyle,
		orientationStyle,
		logo,
		buttonOption,
		socialOption,
	} = attributes;

	const borderBottomColor = borderColor ? { borderBottomColor: borderColor } : undefined;

	const blockProps = useBlockProps.save( {
		className: 'block__logo-banner',
		style: { ...borderBottomColor },
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save(
		{ className: `inner-blocks-wrapper` }
	);

	/**
	 * Handle additional logic
	 */
	const styledElementClasses = filterOutWhiteSpace( [ 'logo-banner-styled-element', borderStyle ] );

	const base = baseStyle ?? '';
	const isCurved = baseStyle === 'has-curve';
	const curvedBaseWithBorder = ( isCurved && borderColor ) ? 'has-curved-border' : '';

	const layout = layoutStyle ?? '';

	const orientation = orientationStyle ?? '';

	const hasNoImage = ! logo ? 'has-no-image' : '';
	const isEmptyImage = isEmpty( logo );
	const showPlaceholder = isEmptyImage ? true : false;

	/**
	 * Handle styles
	 */
	const bgColor = backgroundColor ? { backgroundColor } : undefined;
	const bColor = borderColor ? { borderColor } : undefined;

	const hColor = headingColor ? { color: headingColor } : undefined;
	const tColor = textColor ? { color: textColor } : undefined;

	/**
	 * Handle element classes
	 */
	const logoBannerInnerClasses = filterOutWhiteSpace( [
		'logo-banner--inner',
		layout,
		orientation,
		base,
		curvedBaseWithBorder,
		hasNoImage,
	] );

	return (
		<div { ...blockProps }>

			<div
				className={ logoBannerInnerClasses }
				style={{ ...bgColor, color: borderColor }}>

				<div
					className={ styledElementClasses }
					style={{ ...bColor }}
				>
				</div>

				<div className='logo-banner-wrapper'>

					<div className="logo-element">
						<img className="logo"
							src={ logo.sizes?.full.url }
						/>
					</div>

					<div className="text-side-elements" style={{ color: '#000' }}>

						<RichText.Content
							className='heading-4 logobanner__heading'
							tagName='h4'
							value={ heading }
							style={{ ...hColor }}
						/>

						<RichText.Content
							className='paragraph-1 logobanner__text font-400'
							tagName='p'
							value={ text }
							style={{ ...tColor }}
						/>

						{ socialOption && (
							<div {...innerBlocksProps} >
								{ children }
							</div>
						) }

						{ buttonOption && (
							<div {...innerBlocksProps}>
								{ children }
							</div>
						) }

					</div>
				</div>
			</div>

		</div>
	);
};

export default save;
