/**
 * External dependencies
 */
import isEmpty from 'lodash/isEmpty';

/**
 * DWT dependencies
 */
import {
	getInnerBlocks,
} from '../utils/block-utils';

import { filterOutWhiteSpace } from '../utils/general-utils';
import Placeholder from '../block-components/Placeholder';

/**
 * WP dependencies
 */
import {
	ColorPalette,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, clientId } ) => {
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
		splitLayoutOption,
		logo,
		buttonOption,
		socialOption,
	} = attributes;

	const borderBottomColor = borderColor ? { borderBottomColor: borderColor } : undefined;
	const blockProps = useBlockProps( {
		className: 'block__logo-banner',
		style: { ...borderBottomColor },
	} );

	/**
	 * Inner Block
	 */
	const innerBlocks = getInnerBlocks( clientId );

	const template = ( buttonOption && ! socialOption )
		? [
			[ 'dwt/button', {} ],
		]
		: ( ( socialOption && ! buttonOption )
			? [
				[ 'core/social-links', {} ],
			]
			: []
		);

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: `inner-blocks-wrapper` },
		{
			allowedBlocks: [],
			renderAppender: false,
			template,
		}
	);

	/**
	 * Logo Settings
	 */
	const isEmptyImage = isEmpty( logo );

	const onSelectLogo = ( value ) => {
		setAttributes( { logo: value } );
	};

	/**
	 * Image settings
	 */
	const showPlaceholder = isEmptyImage ? true : false;

	const ALLOWED_MEDIA_TYPES = [ 'image' ];

	const removeImage = () => {
		setAttributes( { logo: undefined } );
	};

	/**
	 * Layout Settings
	 *
	 * @param  newSplitLayoutOption
	 */
	const onChangeSplitLayoutOption = ( newSplitLayoutOption ) => {
		setAttributes( { splitLayoutOption: newSplitLayoutOption } );
		if ( ! splitLayoutOption ) {
			setAttributes( { layoutStyle: 'is-split' } );
			setAttributes( { orientationStyle: 'is-left' } );
		} else {
			setAttributes( { layoutStyle: 'is-stacked' } );
		}
	};

	const layout = layoutStyle ?? '';

	/**
	 * Orientation Settings
	 *
	 * @param  newOrientationStyle
	 */
	const onSelectOrientationStyle = ( newOrientationStyle ) => {
		setAttributes( { orientationStyle: newOrientationStyle } );
	};

	const orientation = orientationStyle ?? '';

	/**
	 * Base settings
	 *
	 * @param  newBaseStyle
	 */
	const onSelectBaseStyle = ( newBaseStyle ) => {
		setAttributes( { baseStyle: newBaseStyle } );
	};

	const base = baseStyle ?? '';
	const isBumpUp = baseStyle === 'has-bump-up';
	const isCurved = baseStyle === 'has-curve';
	const curvedBaseWithBorder = ( isCurved && borderColor ) ? 'has-curved-border' : '';

	/**
	 * Border settings
	 *
	 * @param  newBorderColor
	 */
	const onChangeBorderColor = ( newBorderColor ) => {
		setAttributes( { borderColor: newBorderColor } );
	};

	const variantBorderStyle = ( isBumpUp && borderColor ) ? 'border-t-6'
		: ( ! isBumpUp && ! isCurved && borderColor ) ? 'border-b-6' : '';
	setAttributes( { borderStyle: variantBorderStyle } );

	const onClickBorderReset = () => {
		setAttributes( { borderColor: undefined, baseStyle: 'is-default' } );
	};

	/**
	 * Background Settings
	 *
	 * @param  newBackgroundColor
	 */
	const onChangeBackgroundColor = ( newBackgroundColor ) => {
		setAttributes( { backgroundColor: newBackgroundColor } );
	};

	/**
	 * Heading/text settings
	 *
	 * @param  newHeading
	 */
	const onChangeHeading = ( newHeading ) => setAttributes( { heading: newHeading } );
	const onChangeText = ( newText ) => setAttributes( { text: newText } );

	const onChangeHeadingColor = ( newHeadingColor ) => setAttributes( { headingColor: newHeadingColor } );
	const onChangeTextColor = ( newTextColor ) => setAttributes( { textColor: newTextColor } );

	const hColor = headingColor ? { color: headingColor } : undefined;
	const tColor = textColor ? { color: textColor } : undefined;

	/**
	 * CTA Option settings
	 */
	const onChangeButtonOption = () => {
		if ( buttonOption === false && socialOption === true ) {
			setAttributes( { socialOption: false } );
			setAttributes( { buttonOption: false } );
		}
		setAttributes( { buttonOption: ! buttonOption } );
		innerBlocks.length = 0;
	};

	const onChangeSocialOption = () => {
		if ( socialOption === false && buttonOption === true ) {
			setAttributes( { buttonOption: false } );
			setAttributes( { socialOption: false } );
		}
		setAttributes( { socialOption: ! socialOption } );
		innerBlocks.length = 0;
	};

	/**
	 * Handle additional logic
	 */
	const uploadText = ! isEmptyImage ? 'Replace image' : 'Upload image';
	const hasNoImage = ! logo ? 'has-no-image' : '';

	/**
	 * Handle styles
	 */
	const bgColor = backgroundColor ? { backgroundColor } : undefined;
	const bColor = borderColor ? { borderColor } : undefined;

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

	const styledElementClasses = filterOutWhiteSpace( [ 'logo-banner-styled-element', borderStyle ] );

	return (
		<>
			<InspectorControls>

				<PanelBody title={ __( 'Image', 'dwt-custom-theme' ) }>

					<div className="components-base-control">
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								onSelect={ onSelectLogo }
								type='image'
								value={ logo }
								render={( { open } ) => (
									<>
										<Button
											onClick={ open }
											icon='upload'
											className='editor-media-placeholder__button is-button is-default is-large is-secondary'
										>
											{ __( uploadText, 'dwt-custom-theme' ) }
										</Button>
										{ ! isEmptyImage && (
											<div className="mt-5">
												<Button
													onClick={ removeImage } isLink isDestructive
													className='flex mt-10 mb-5'
												>
													{ __( 'Remove image', 'dwt-custom-theme' ) }
												</Button>
											</div>

										) }
									</>
								) }
							/>
						</MediaUploadCheck>
					</div>

				</PanelBody>

				<PanelBody title={ __( 'General', 'dwt-custom-theme' ) }>

					<ToggleControl
						className="editor-toggle-button"
						help={__( 'Default is stacked layout.' ) }
						label="Split Layout"
						checked={ splitLayoutOption }
						onChange={ onChangeSplitLayoutOption }
					/>

					{ splitLayoutOption && (
						<>
							<p className='editor-subtitle'>Orientation</p>
							<SelectControl
								value={orientationStyle}
								options={[
									{ label: 'Left', value: 'is-left' },
									{ label: 'Right', value: 'is-right' },
								]}
								onChange={onSelectOrientationStyle}
								__nextHasNoMarginBottom
							/>
						</>
					) }

					<p className='editor-subtitle'>Select a background color</p>
					<ColorPalette
						value={ backgroundColor }
						onChange={ onChangeBackgroundColor }
					/>

					<p className='editor-subtitle'>Base Style</p>
					<SelectControl
						value={ baseStyle }
						options={ [
							{ label: 'Default', value: 'is-default' },
							{ label: 'Bump up', value: 'has-bump-up' },
							{ label: 'Curved', value: 'has-curve' },
						] }
						onChange={ onSelectBaseStyle }
						__nextHasNoMarginBottom
					/>

					<p className='editor-subtitle'>Border Color</p>
					<ColorPalette
						value={ borderColor }
						onChange={ onChangeBorderColor }
						clearable={ false }
					/>

					<div className='flex justify-end mt-10'>
						<Button
							onClick={ onClickBorderReset }
							className='is-secondary is-small'
						>
							{ __( 'Reset border/base', 'dwt-custom-theme' ) }
						</Button>
					</div>

				</PanelBody>

				<PanelBody title={ __( 'Type settings', 'dwt-custom-theme' ) } initialOpen={ false }>

					<h4 className='editor-subtitle'>Select a heading color</h4>
					<ColorPalette
						value={ headingColor }
						onChange={ onChangeHeadingColor }
					/>

					<h4 className='editor-subtitle'>Select a text color</h4>
					<ColorPalette
						value={ textColor }
						onChange={ onChangeTextColor }
					/>

				</PanelBody>

				<PanelBody title={ __( 'Call To Action', 'dwt-custom-theme' ) } initialOpen={ false }>

					<p className='editor-subtitle'>Select one of the following.</p>

					<ToggleControl
						className="editor-toggle-button"
						label="Button Link"
						help={__( 'Select the button in layout to access more settings.' ) }
						checked={ buttonOption }
						onChange={ onChangeButtonOption }

					/>

					<ToggleControl
						className="editor-toggle-button"
						label="Social Media"
						checked={ socialOption }
						onChange={ onChangeSocialOption }
					/>

				</PanelBody>

			</InspectorControls>

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

						{ showPlaceholder && (
							<Placeholder
								title={ __( 'Image', 'dwt-custom-theme' ) }
								text={ __( 'Upload a logo in the side panel.', 'dwt-custom-theme' ) }
								icon='format-image'
							/>
						) }

						{ ! showPlaceholder && (
							<div className="logo-element">
								<img className="logo"
									src={ logo.sizes?.full.url }
								/>
							</div>
						) }

						<div className="text-side-elements" style={{ color: '#000' }}>

							<RichText
								className='heading-4 logobanner__heading'
								tagName='h4'
								placeholder={ __( 'Add headline.', 'dwt-custom-theme' ) }
								allowedFormats={ [] }
								value={ heading }
								onChange={ onChangeHeading }
								style={{ ...hColor }}
							/>

							<RichText
								className='paragraph-1 logobanner__text font-400'
								tagName='p'
								placeholder={ __( 'Add paragraph text.', 'dwt-custom-theme' ) }
								value={ text }
								onChange={ onChangeText }
								style={{ ...tColor }}
							/>

							{ socialOption && (
								<div {...innerBlocksProps}>
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
		</>
	);
};

export default Edit;

