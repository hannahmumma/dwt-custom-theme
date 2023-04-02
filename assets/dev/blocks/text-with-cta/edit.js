/**
 * Module: Text with CTA
 * Parent Block(s):
 * - Image with Text
 */

/**
 * External dependencies
 */

/**
 * DWT dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';
import { getParentBlockAttrs, getParentBlock } from '../utils/block-utils';

/**
 * DWT components
 */

import BaseStyles from '../block-components/BaseStyles';
import colors from '../block-components/Colors';

/**
 * WP dependencies
 */

import {
	ColorPalette,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const {
		layout,
		stackedAlignment,
		splitHeadingOrientation,
		baseStyle,
		borderColor,
		borderStyle,
		backgroundColor,
		borderColorFromImageWithText,
		layoutFromImageWithText,
		heading,
		headingColor,
		text,
		textColor,
	} = attributes;

	const hasParent = getParentBlock( clientId );
	const imageWithTextAttrs = getParentBlockAttrs( clientId );

	const bgColor = layoutFromImageWithText !== 'layered' && backgroundColor ? { backgroundColor } : undefined;
	const colorForBase = baseStyle ? { color: borderColor } : null;

	const blockProps = useBlockProps( {
		className: 'block__text-with-cta w-full',
		style: { ...bgColor, ...colorForBase },
	} );

	const template = [
		[ 'dwt/button' ],
		[ 'core/social-links' ],
	];

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: 'inner-blocks-wrapper' },
		{
			allowedBlocks: [],
			template,
			templateLock: 'all',
			renderAppender: false,
		}
	);

	/**
	 * Handle layout and alignment
	 */

	const handleLayout = ( newLayout ) => {
		if ( newLayout === 'is-stacked' ) {
			setAttributes( { splitHeadingOrientation: undefined } );
		}

		if ( newLayout === 'is-split' ) {
			setAttributes( { stackedAlignment: undefined } );
		}

		setAttributes( { layout: newLayout } );
	};

	const handleSplitHeadingOrientation = ( newHeadingOrientation ) => setAttributes( { splitHeadingOrientation: newHeadingOrientation } );
	const handleStackedAlignment = ( newStackedAlignment ) => setAttributes( { stackedAlignment: newStackedAlignment } );

	/**
	 * Color settings
	 */

	const onChangeBackgroundColor = ( newBackgroundColor ) => setAttributes( { backgroundColor: newBackgroundColor } );
	const onChangeHeadingColor = ( newHeadingColor ) => setAttributes( { headingColor: newHeadingColor } );
	const onChangeTextColor = ( newTextColor ) => setAttributes( { textColor: newTextColor } );

	/**
	 * Heading/text settings
	 */

	const handleHeading = ( newHeading ) => setAttributes( { heading: newHeading } );
	const handleText = ( newText ) => setAttributes( { text: newText } );

	/**
	 * Heading base styles
	 */

	const handleBaseStyle = ( newBaseStyle ) => setAttributes( { baseStyle: newBaseStyle } );

	const isBumpUp = baseStyle === 'has-bump-up';
	const isCurved = baseStyle === 'has-curve';
	const curvedBaseWithBorder = ( isCurved && borderColor ) ? 'has-curved-border' : '';

	if ( hasParent.length > 0 ) {
		setAttributes( { baseStyle: undefined } );
	}

	/**
	 * Border settings
	 */

	const handleBorderColor = ( newBorderColor ) => {
		if ( baseStyle === '' ) {
			setAttributes( { baseStyle: 'is-default-base' } );
		}
		setAttributes( { borderColor: newBorderColor } );
	};

	const variantBorderStyle = ( isBumpUp && borderColor ) ? 'has-border-top'
		: ( ! isBumpUp && ! isCurved && borderColor ) ? 'has-border-bottom' : '';

	setAttributes( { borderStyle: variantBorderStyle } );

	/**
	 * Handle element styles
	 */

	const hColor = headingColor ? { color: headingColor } : undefined;
	const tColor = textColor ? { color: textColor } : undefined;

	/**
	 * Handle element classes
	 */

	const blockWrapperClasses = filterOutWhiteSpace( [
		'block-wrapper',
		layout,
		stackedAlignment,
		splitHeadingOrientation,
		baseStyle,
		curvedBaseWithBorder,
		borderStyle,
	] );

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color settings', 'dwt-custom-theme' ) }
					settings={ [
						{
							colorValue: backgroundColor,
							colors,
							label: __( 'Background', 'dwt-custom-theme' ),
							onColorChange: onChangeBackgroundColor,
							clearable: true,
						},
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

				{ hasParent.length === 0 && (
					<PanelBody title={ __( 'Settings', 'dwt-custom-theme' ) }>

						<SelectControl
							label={__( 'Layout', 'dwt-custom-theme' ) }
							value={ layout }
							options={ [
								{ label: 'Split', value: 'is-split' },
								{ label: 'Stacked', value: 'is-stacked' },
							] }
							onChange={ handleLayout }
							__nextHasNoMarginBottom
						/>

						{ layout === 'is-split' && (
							<SelectControl
								label={__( 'Heading Orientation', 'dwt-custom-theme' ) }
								value={ splitHeadingOrientation }
								options={ [
									{ label: 'Left', value: 'is-left' },
									{ label: 'Right', value: 'is-right' },
								] }
								onChange={ handleSplitHeadingOrientation }
								__nextHasNoMarginBottom
							/>
						) }

						{ layout === 'is-stacked' && (
							<SelectControl
								label={__( 'Alignment', 'dwt-custom-theme' ) }
								value={ stackedAlignment }
								options={ [
									{ label: 'Left', value: 'is-left' },
									{ label: 'Center', value: 'is-center' },
								] }
								onChange={ handleStackedAlignment }
								__nextHasNoMarginBottom
							/>
						) }

						<BaseStyles
							baseStyle={ baseStyle }
							borderColor={ borderColor }
							handleBaseStyle={ handleBaseStyle }
							handleBorderColor={ handleBorderColor }
							setAttributes={ setAttributes }
						/>
					</PanelBody>

				) }
			</InspectorControls>

			<div { ...blockProps }>
				<div className='text-with-cta--inner'>
					<div className={ blockWrapperClasses }>
						<RichText
							className='heading-3 text-with-cta__heading text-black break-normal'
							tagName='h3'
							placeholder={ __( 'Enter headline text', 'dwt-custom-theme' ) }
							allowedFormats={ [] }
							value={ heading }
							onChange={ handleHeading }
							style={{ ...hColor }}
						/>
						<RichText
							className='paragraph-2 text-with-cta__text text-black break-normal'
							tagName='p'
							placeholder={ __( 'Enter paragraph text', 'dwt-custom-theme' ) }
							value={ text }
							onChange={ handleText }
							style={{ ...tColor }}
						/>
						<div { ...innerBlocksProps }>
							{ children }
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
