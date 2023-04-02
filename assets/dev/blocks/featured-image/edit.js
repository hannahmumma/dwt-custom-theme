/**
 * Module: Featured Image
 * Parent block(s):
 * - Image with Text
 *
 * Child blocks
 * - Book Cover
 */

/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * DWT dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';

import {
	getInnerBlocks,
	getParentBlock,
	getParentBlockAttrs,
	lockInnerBlocks,
} from '../utils/block-utils';

import BlockInfo from '../block-components/BlockInfo';

/**
 * WP dependencies
 */

import {
	ColorPalette,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	URLInput,
	useBlockProps,
	useInnerBlocksProps,
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
		image,
		mobileImage,
		blurEffect,
		borderColor,
		borderStyle,
		baseStyle,
		url,
		linkTarget,
		coverImagesOption,
		backgroundColorOption,
		backgroundColor,
		innerBlockCount,
		bookCoverBlockImages,
		hasImageWithTextParentBlock,
	} = attributes;

	/**
	 * General
	 */

	const isEmptyImage = isEmpty( image );
	const isEmptyMobileImage = isEmpty( mobileImage );

	/**
	 * Handle blockProps
	 */

	// We need to set the color property of this block to the value of the border color.
	// This is so we can set the border color as currentcolor for the base styles.
	// Setting at top block level due to aspect ratios on inner div and image
	const borderColorForBaseStyles = hasImageWithTextParentBlock.length === 0 && borderColor ? { color: borderColor } : undefined;

	const blockProps = useBlockProps( {
		className: 'block__featured-image',
		style: { ...borderColorForBaseStyles },
	} );

	/**
	 * Handle Featured Image Module as an innerBlock
	 */

	const parent = getParentBlock( clientId );
	const parentAttrs = getParentBlockAttrs( clientId );
	const hasParent = parent.length > 0;

	let parentLayout;

	Object.entries( [ parentAttrs ] ).map( ( [ key, value ] ) => {
		parentLayout = value?.layout;
	} );

	setAttributes( { hasImageWithTextParentBlock: parent } );

	/**
	 * Handle book covers innerBlocks
	 */

	const innerBlocks = getInnerBlocks( clientId );

	useEffect( () => {
		
		const arr = [];
		
		Object.entries( innerBlocks ).map( ( [ key, value ] ) => {
			if ( value.attributes.apiImage || ! isEmpty( value.attributes.uploadedImage ) ) {
				arr.push(value);
			}		
		} );

		setAttributes({ bookCoverBlockImages: arr } );
		setAttributes( { innerBlockCount: innerBlocks.length } );		

	}, [ innerBlocks ] )

	if ( ! coverImagesOption && innerBlocks ) {
		innerBlocks.length = 0;
	}

	const renderAppender = parentLayout === '50-50' && innerBlockCount === 1 ? false
		: parentLayout === '40-60' && innerBlockCount === 2 ? false
			: innerBlockCount < 4 ? undefined : false;

	const template = coverImagesOption && parentLayout === '50-50'
		? [
			[ 'dwt/book-cover', {} ],
		]
		: [
			[ 'dwt/book-cover', {} ],
			[ 'dwt/book-cover', {} ],
			[ 'dwt/book-cover', {} ],
			[ 'dwt/book-cover', {} ],
		];

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: `inner-blocks-wrapper ${ coverImagesOption && ! isEmptyImage ? 'absolute' : '' }` },
		{
			allowedBlocks: [],
			renderAppender,
			template,
		}
	);

	/**
	 * Image settings
	 */

	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	const handleImage = ( newImage ) => {
		if ( backgroundColorOption || backgroundColor ) {
			setAttributes( { backgroundColorOption: false, backgroundColor: undefined } );
		}
		setAttributes( { image: newImage } );
	};

	const handleRemoveImage = () => {
		if ( blurEffect || baseStyle || borderColor || url || linkTarget || mobileImage ) {
			setAttributes( {
				blurEffect: false,
				baseStyle: undefined,
				borderColor: undefined,
				url: undefined,
				linkTarget: false,
				mobileImage: {},
			} );
		}
		setAttributes( { image: {} } );
	};

	const hasBlur = ! isEmptyImage && blurEffect ? 'image-has-blur' : '';
	const handleMobileImage = ( newMobileImage ) => setAttributes( { mobileImage: newMobileImage } );
	const handleRemoveMobileImage = () => setAttributes( { mobileImage: {} } );

	/**
	 * Book cover images option settings
	 */

	const handleCoverImagesOption = ( newcoverImagesOption ) => setAttributes( { coverImagesOption: newcoverImagesOption } );

	/**
	 * Background color settings
	 */

	const handleBackgroundColorRemoval = () => {
		if ( backgroundColor || baseStyle || borderColor ) {
			setAttributes( {
				backgroundColor: undefined,
				baseStyle: undefined,
				borderColor: undefined,
			} );
		}
	};

	const handleChangeBackgroundColorOption = ( newBackgroundColorOption ) => {
		handleBackgroundColorRemoval();
		setAttributes( { backgroundColorOption: newBackgroundColorOption } );
	};

	if ( ! coverImagesOption && backgroundColorOption ) {
		handleBackgroundColorRemoval();
		setAttributes( { backgroundColorOption: false } );
	}

	const handleChangeBackgroundColor = ( newBackgroundColor ) => {
		setAttributes( { backgroundColor: newBackgroundColor } );
	};

	/**
	 * Base settings
	 */

	const handleBaseStyle = ( newBaseStyle ) => setAttributes( { baseStyle: newBaseStyle } );
	const isBumpUp = baseStyle === 'has-bump-up';
	const isCurved = baseStyle === 'has-curve';
	const curvedBaseWithBorder = ( isCurved && borderColor ) ? 'has-curved-border' : '';

	/**
	 * Border settings
	 */

	const handleBorderColor = ( newBorderColor ) => setAttributes( { borderColor: newBorderColor } );

	const variantBorderStyle = ( isBumpUp && borderColor ) ? 'has-border-top'
		: ( ! isBumpUp && ! isCurved && borderColor ) ? 'has-border-bottom' : '';

	setAttributes( { borderStyle: variantBorderStyle } );

	/**
	 * Handle side effects
	 */

	const min = parentLayout === '40-60' || parentLayout === 'layered' ? 2 : 1;

	lockInnerBlocks( innerBlocks, min );

	/**
	 * Handle additional logic
	 */
	const showPlaceholder = ! coverImagesOption && isEmptyImage ? true : false;
	const hasBlockInfo = showPlaceholder ? 'has-block-info' : '';

	const bookCoversHelpText = ! coverImagesOption ? 'Add up to 4 book covers' : 'Remove book covers';
	const uploadText = ! isEmptyImage ? 'Replace image' : 'Upload image';
	const uploadTextMobile = ! isEmptyMobileImage ? 'Replace mobile image' : 'Upload mobile image';

	const hasCovers = coverImagesOption ? 'has-covers' : '';
	const hasOneCover = coverImagesOption && innerBlockCount === 1 ? 'has-one-cover' : '';
	const hasTwoCovers = coverImagesOption && innerBlockCount === 2 ? 'has-two-covers' : '';
	const hasThreeCovers = coverImagesOption && innerBlockCount === 3 ? 'has-three-covers' : '';
	const showForImageOrBackgroundColor = ! isEmptyImage || backgroundColor ? true : false;

	/**
	 * Handle element styles
	 */

	const bgColor = backgroundColor && coverImagesOption ? { backgroundColor } : undefined;

	/**
	 * Handle element classes
	 */

	const featuredImageInnerClasses = filterOutWhiteSpace( [
		'featured-image--inner',
		baseStyle,
		curvedBaseWithBorder,
		borderStyle,
		hasBlockInfo,
		hasBlur,
		hasCovers,
		hasOneCover,
		hasTwoCovers,
		hasThreeCovers,
	] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Image settings', 'dwt-custom-theme' ) }
				>
					<div className="components-base-control">
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								onSelect={ handleImage }
								type='image'
								value={ image }
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
													onClick={ handleRemoveImage } isLink isDestructive
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

					{ ! isEmptyImage && (
						<div className="components-base-control">
							<h2>Mobile Image</h2>

							{ ! isEmptyMobileImage && (
								<img className='featured-image__image-mobile w-full mb-24' src={ mobileImage?.sizes?.full?.url } alt={ mobileImage?.alt } loading='lazy' />
							) }

							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ ALLOWED_MEDIA_TYPES }
									onSelect={ handleMobileImage }
									type='image'
									value={ mobileImage }
									render={ ( { open } ) => (
										<>
											<Button
												onClick={ open }
												icon='upload'
												className='editor-media-placeholder__button is-button is-default is-large is-secondary'
											>
												{ __( uploadTextMobile, 'dwt-custom-theme' ) }
											</Button>
											{ ! isEmptyMobileImage && (
												<div className="mt-5">
													<Button
														onClick={ handleRemoveMobileImage } isLink isDestructive
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
					) }

					{ ! isEmptyImage && ! backgroundColor && (
						<ToggleControl
							className="editor-toggle-button"
							label={ __( 'Blur Effect', 'dwt-custom-theme' ) }
							help={__( 'Add blur effect to image.' ) }
							checked={ blurEffect }
							onChange={ () => {
								setAttributes( { blurEffect: ! blurEffect } );
							} }
						/>

					) }

					{ hasImageWithTextParentBlock.length === 0 && showForImageOrBackgroundColor && (
						<>
							<SelectControl
								label={__( 'Base Style', 'dwt-custom-theme' ) }
								value={ baseStyle }
								options={ [
									{ label: 'Default', value: 'is-default-base' },
									{ label: 'Bump up', value: 'has-bump-up' },
									{ label: 'Curved', value: 'has-curve' },
								] }
								onChange={ handleBaseStyle }
								__nextHasNoMarginBottom
							/>
							<div className="components-base-control">
								<p className='editor-subtitle'>Border Color</p>
								<ColorPalette
									value={ borderColor }
									onChange={ handleBorderColor }
									clearable={ false }
								/>
							</div>
						</>
					) }

					{ ! isEmptyImage && ! backgroundColor && (
						<>

							<URLInput
								label={ __( 'Link image', 'dwt-custom-theme' ) }
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

				<PanelBody title={ __( 'Book Cover Settings', 'dwt-custom-theme' ) }>
					<ToggleControl
						className="editor-toggle-button"
						label={ __( 'Add book covers', 'dwt-custom-theme' ) }
						checked={ coverImagesOption }
						onChange={ handleCoverImagesOption }
						help ={ __( bookCoversHelpText, 'dwt-custom-theme' ) }
					/>

					{ coverImagesOption && isEmptyImage && (
						<ToggleControl
							className="editor-toggle-button"
							label={ __( 'Background Color', 'dwt-custom-theme' ) }
							help={ __( 'Use a background color instead of an image.', 'dwt-custom-theme' ) }
							checked={ backgroundColorOption }
							onChange={ handleChangeBackgroundColorOption }
						/>
					) }

					{ coverImagesOption && backgroundColorOption && isEmptyImage && (
						<div className="components-base-control">
							<p className='editor-subtitle'>Select a background color</p>
							<ColorPalette
								value={ backgroundColor }
								onChange={ handleChangeBackgroundColor }
								clearable={ false }
							/>
						</div>
					) }

					{ hasImageWithTextParentBlock.length === 0 && backgroundColor && ! isEmptyImage && (
						<>
							<SelectControl
								label={__( 'Base Style', 'dwt-custom-theme' ) }
								value={ baseStyle }
								options={ [
									{ label: 'Default', value: 'is-default' },
									{ label: 'Bump up', value: 'has-bump-up' },
									{ label: 'Curved', value: 'has-curve' },
								] }
								onChange={ handleBaseStyle }
								__nextHasNoMarginBottom
							/>
							<p className='editor-subtitle'>Border Color</p>
							<ColorPalette
								value={ borderColor }
								onChange={ handleBorderColor }
								clearable={ false }
							/>
						</>
					) }
				</PanelBody>

			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ featuredImageInnerClasses }
					style={ { ...bgColor } }>

					{ ! isEmptyImage && (

						<div className="image-wrapper w-full h-full">
							<picture>
								{ mobileImage?.sizes?.full?.url && (
									<source srcset={ mobileImage?.sizes?.full?.url } media="(max-width: 375px)" />
								) }

								{ image.sizes.full?.url && (
									<source srcset={ image.sizes.full?.url } media="(max-width: 1024px)" />
								) }

								<img className='featured-image__image w-full h-full object-cover object-center' src={ image.sizes.full?.url } alt={ image?.alt } loading='lazy' />
							</picture>
						</div>
					) }

					{ coverImagesOption && (
						<div { ...innerBlocksProps }>
							{ children }
						</div>
					) }
				</div>
			</div>
		</>
	);
};

export default Edit;
