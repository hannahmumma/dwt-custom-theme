/**
 * Module: Button
 * Parent Blocks:
 * - Email form
 * - Text with CTA
 */

/**
 * DWT Dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';
import { getBlockPropAttr, getCurrentBlock, getBlockParentsByName, getBlockAttrs, getAllEditorBlocks } from '../utils/block-utils';
import { arrowRightIcon } from '../../img/icons';

import colors from '../block-components/Colors';

/**
 * WP Dependencies
 */

import {
	ColorPalette,
	InspectorControls,
	RichText,
	URLInput,
	useBlockProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	Button,
	ButtonGroup,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, isSelected, context, clientId } ) => {
	const {
		buttonIsSelected,
		backgroundColor,
		text,
		textColor,
		width,
		textButtonOption,
		url,
		linkTarget,
		listTypeFromBooklist,
		hasCTASlideFromCarousel,
		hasNewletterParentBlock,
	} = attributes;

	/**
	 * General settings
	 */

	const blockProps = useBlockProps( {
		className: `block__button`,
	} );

	/**
	 * Handle newsletter block settings as they relate to the button
	 */

	const newsletterBlockParent = getBlockParentsByName( clientId, 'dwt/newsletter' );
	const newsletterAttrs = getBlockAttrs( newsletterBlockParent );
	setAttributes( { hasNewletterParentBlock: newsletterAttrs?.isNewsletter } );

	/**
	 * Handle carousel settings as they relate to the button
	 */

	const carouselParentBlock = getBlockParentsByName( clientId, 'dwt/carousel' );
	const carouselBlockAttrs = getBlockAttrs( carouselParentBlock );
	setAttributes( { hasCTASlideFromCarousel: carouselBlockAttrs?.hasCTASlide } );

	/**
	 * Handle book list as it relates to the button
	 */

	const allBlocks = getAllEditorBlocks();
	let booklistAttrs = {};

	Object.entries( allBlocks ).map( ( [ key, value ] ) => {
		for ( const [ k, v ] of Object.entries( value ) ) {
			if ( k === 'innerBlocks' ) {
				v.map( ( item ) => {
					if ( item.name === 'dwt/list' ) {
						booklistAttrs = item.attributes;
					}
				} );
			}
		}
	} );

	const listType = booklistAttrs.listType;
	const isFullList = listType === 'full-list';
	setAttributes( { listTypeFromBooklist: listType } );

	if ( isFullList ) {
		setAttributes( { url: '' } );
		setAttributes( { linkTarget: false } );
	}

	/**
	 * Handle UI button settings
	 */

	const onChangeText = ( newText ) => setAttributes( { text: newText } );

	/**
	 * Handle additional logic
	 */

	const isFill = getBlockPropAttr( blockProps, 'className', 'is-style-fill' );
	const isOutline = getBlockPropAttr( blockProps, 'className', 'is-style-outline' );
	setAttributes( { buttonIsSelected: isSelected } );

	const isFillIsDefaultLogic = isFill || ( ! isFill && ! isOutline );

	const buttonTypeClass = ( ! textButtonOption && isFillIsDefaultLogic ) ? 'btn-primary'
		: ( ! textButtonOption && ! isFillIsDefaultLogic ) ? 'btn-secondary' : 'is-text-link';

	const noBackgroundClass = ( ! textButtonOption && ! backgroundColor ) ? 'no-background-color' : '';
	const noTextClass = ( ! textButtonOption && ! textColor ) ? 'no-text-color' : '';

	/**
	 * Handle element styles
	 */

	const bgColor = backgroundColor ? { backgroundColor } : undefined;
	const borderStyles = textColor ? { border: `1px solid ${ textColor }` } : undefined;

	const buttonStyles = isFillIsDefaultLogic && ! textButtonOption ? bgColor
		: ! isFillIsDefaultLogic && ! textButtonOption ? borderStyles : undefined;

	const textStyle = textColor ? { color: textColor } : undefined;

	/**
	 * Handle element classes
	 */

	const buttonClasses = filterOutWhiteSpace( [
		buttonTypeClass,
		noBackgroundClass,
		noTextClass,
		`w-${ width }`,
	] );

	const excludeList = hasNewletterParentBlock || hasCTASlideFromCarousel ? true : false;

	return (
		<>
			<InspectorControls>
				{ isFillIsDefaultLogic && ! textButtonOption && (

					<PanelColorGradientSettings
						title={ __( 'Button color settings', 'dwt-custom-theme' ) }
						settings={ [
							{
								colorValue: backgroundColor,
								colors,
								label: __( 'Background', 'dwt-custom-theme' ),
								onColorChange: ( newBackgroundColor ) => setAttributes( { backgroundColor: newBackgroundColor } ),
								clearable: true,
							},
							{
								colorValue: textColor,
								colors,
								label: __( 'Text', 'dwt-custom-theme' ),
								onColorChange: ( newTextColor ) => setAttributes( { textColor: newTextColor } ),
								clearable: true,
							},
						] }
					>
					</PanelColorGradientSettings>
				) }

				{ ! hasNewletterParentBlock && (
					<PanelBody title={ __( 'Options', 'dwt-custom-theme' ) }>
						<ToggleControl
							className="editor-toggle-button"
							label="Text Button"
							help={__( 'Use a text button.' ) }
							checked={ textButtonOption }
							onChange={ () => {
								setAttributes( { textButtonOption: ! textButtonOption } );
								if ( width === 'full' ) {
									setAttributes( { width: 'auto' } );
								}
							} }
						/>
						{ ! isFullList && (
							<>
								<URLInput
									label={ __( 'Add link', 'dwt-custom-theme' ) }
									placeholder={ __( 'Enter a path or full URL', 'dwt-custom-theme' ) }
									value={ url }
									onChange={ ( theUrl ) => setAttributes( { url: theUrl } ) }
									disableSuggestions={ true }
								/>
								<ToggleControl
									className="editor-toggle-button"
									label={ __( 'Link Target', 'dwt-custom-theme' ) }
									help={__( 'Open url in a new window.', 'dwt-custom-theme' ) }
									checked={ linkTarget }
									onChange={ () => {
										setAttributes( { linkTarget: ! linkTarget } );
									} }
								/>
							</>
						) }

					</PanelBody>
				) }

				{ ! textButtonOption && hasNewletterParentBlock && (

					<PanelBody title={ __( 'Width settings', 'dwt-custom-theme' ) }>
						<p className="editor-subtitle">Select width</p>

						<ButtonGroup>
							{ [ 'Auto', 'Full' ].map( ( item, key ) => {
								return (
									<Button
										key={ key }
										className={ width === item.toLowerCase() ? 'is-primary' : 'is-secondary' }
										onClick={ () => setAttributes( { width: item.toLowerCase() } ) }
										isSmall
									>
										{ item }
									</Button>
								);
							} ) }
						</ButtonGroup>

					</PanelBody>

				) }
			</InspectorControls>

			<div { ...blockProps }>
				{ ! excludeList && (
					<div className={ `button-wrapper flex gap-10 items-center text-black w-${ width }` } style={ { ...textStyle } }>
						<RichText
							className={ buttonClasses }
							tagName='div'
							placeholder={ __( 'Add text', 'dwt-custom-theme' ) }
							allowedFormats={ [] }
							value={ text }
							onChange={ onChangeText }
							style={ { ...buttonStyles, ...textStyle } }
						/>
						{ textButtonOption ? arrowRightIcon : undefined }
					</div>
				) }

				{ hasNewletterParentBlock && (
					<span className={ buttonClasses } style={ { ...buttonStyles, ...textStyle } }>Sign up</span>
				) }

			</div>
		</>
	);
};

export default Edit;
