/**
 * Module: Heading with Paragraph
 *
 * Parent blocks:
 * - Carousel
 * - Grid
 */

/**
 * External dependencies
 */

/**
 * DWT dependencies
 */

import colors from '../block-components/Colors';

/**
 * WP dependencies
 */

import {
	ColorPalette,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	PanelBody,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

/**
 * Parent blocks:
 * - Carousel
 * - Grid
 */

const Edit = ( { attributes, setAttributes } ) => {
	const {
		heading,
		headingColor,
		text,
		textColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'block__heading-with-paragraph',
	} );

	/**
	 * Heading/text settings
	 */

	const onChangeHeading = ( newHeading ) => setAttributes( { heading: newHeading } );
	const onChangeHeadingColor = ( newHeadingColor ) => setAttributes( { headingColor: newHeadingColor } );
	const onChangeText = ( newText ) => setAttributes( { text: newText } );
	const onChangeTextColor = ( newTextColor ) => setAttributes( { textColor: newTextColor } );

	/**
	 * Handle element styles
	 */

	const hColor = headingColor ? { color: headingColor } : undefined;
	const tColor = textColor ? { color: textColor } : undefined;

	/**
	 * Handle element classes
	 */

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color settings', 'dwt-custom-theme' ) }
					settings={ [
						{
							colorValue: headingColor,
							colors,
							label: __( 'Heading', 'dwt-custom-theme' ),
							onColorChange: onChangeHeadingColor,
							clearable: true,
						},
						{
							colorValue: textColor,
							colors,
							label: __( 'Text', 'dwt-custom-theme' ),
							onColorChange: onChangeTextColor,
							clearable: true,
						},
					] }
				>
				</PanelColorGradientSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="heading-with-paragraph--inner">

					<RichText
						className='heading-2 heading-with-paragraph__heading text-black break-normal'
						tagName='h2'
						placeholder={ __( 'Enter headline text', 'dwt-custom-theme' ) }
						allowedFormats={ [] }
						value={ heading }
						onChange={ onChangeHeading }
						style={{ ...hColor }}
					/>

					<RichText
						className='paragraph-2 heading-with-paragraph__text text-black break-normal'
						tagName='p'
						placeholder={ __( 'Enter paragraph text', 'dwt-custom-theme' ) }
						value={ text }
						onChange={ onChangeText }
						style={{ ...tColor }}
					/>

				</div>
			</div>
		</>
	);
};

export default Edit;
