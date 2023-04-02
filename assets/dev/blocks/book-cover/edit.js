/**
 * Module: Book Cover
 * Parent Blocks:
 * - Featured image
 */

/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * DWT dependencies
 */

import Placeholder from '../block-components/Placeholder';

/**
 * WP dependencies
 */

import apiFetch from '@wordpress/api-fetch';

import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	URLInput,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	RadioControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Parent block:
 * - Featured image
 */

const Edit = ( { attributes, setAttributes } ) => {
	const {
		imageSelection,
		apiImage,
		coverAltText,
		uploadedImage,
		isbn,
		bookTitle,
		author,
		workId,
		url,
		linkTarget,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `block__book-cover flex justify-center`,
	} );

	const isEmptyImage = isEmpty( uploadedImage );

	/**
	 * Image settings
	 */

	const onSelectImage = ( newImageSelection ) => {
		if ( uploadedImage ) {
			setAttributes( { uploadedImage: undefined } );
		}

		if ( apiImage ) {
			setAttributes( { apiImage: undefined, isbn: undefined } );
		}
		setAttributes( { imageSelection: newImageSelection } );
	};

	/**
	 * Uploaded image settings
	 */

	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	const onSelectUploadedImage = ( newUploadedImage ) => setAttributes( { uploadedImage: newUploadedImage } );

	const onRemoveUploadedImage = () => {
		setAttributes( {
			uploadedImage: undefined,
			imageSelection: undefined,
		} );
	};

	const uploadText = ! isEmptyImage ? 'Replace image' : 'Upload image';

	/**
	 * Cover image settings
	 */

	const onChangeIsbn = ( newIsbn ) => setAttributes( { isbn: newIsbn } );
	const onChangeAltText = ( newAltText ) => setAttributes( { coverAltText: newAltText } );

	const [ data, setData ] = useState( [] );
	const [ isError, setError ] = useState( false );

	const onFetchapiImage = async () => {
		await apiFetch( {
			path: '/dwt/v2/single-title',
			method: 'POST',
			data: { isbn },
		} )
			.then( ( response ) => {
			// console.log( response );
				setData( response );
				if ( isError ) {
					setError( false );
				}
			} )
			.catch( ( error ) => {
				if ( error ) {
					setError( true );
				}
			} );
	};

	useEffect( () => {
		if ( isEmpty( data ) ) {
			return;
		}

		setAttributes( {
			bookTitle: data?.title,
			author: data.frontlistiestTitle?.author,
			workId: data?.workId,
			apiImage: isbn ? `https://images.randomhouse.com/cover/${ isbn }` : undefined,
		} );
	} );

	const onRemoveapiImage = () => {
		setAttributes( {
			apiImage: undefined,
			bookTitle: undefined,
			author: undefined,
			isbn: undefined,
			imageSelection: undefined,
		} );
	};

	/**
	 * Handle additional logic
	 */

	const requiredHelpText = isError ? 'Please enter a valid ISBN' : 'Required';
	const showPlaceholder = isEmptyImage && ! apiImage ? true : false;

	const apiImageAltText = ( coverAltText === undefined ) || ( coverAltText === '' ) ? ( `${ bookTitle } by ${ author } ` ).trim() : coverAltText;
	const imageClass = ! isEmptyImage ? 'uploaded-image shadow-book-img' : 'api-image shadow-book-img';

	const imageSrc = ! isEmptyImage ? uploadedImage.sizes.full.url : apiImage;
	const imageAltText = ! isEmptyImage ? uploadedImage.alt : apiImageAltText;

	/**
	 * Handle element styles
	 */

	/**
	 * Handle element classes
	 */

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<h4>Cover Images</h4>
					<RadioControl
						label={ __( 'Image or ISBN', 'dwt-custom-theme' ) }
						selected={ imageSelection }
						options={ [
							{ label: 'Upload Image', value: 'uploaded-image' },
							{ label: 'ISBN', value: 'isbn' },
						] }
						onChange={ onSelectImage }
					/>
				</PanelBody>

				{ imageSelection === 'uploaded-image' && (

					<PanelBody>
						<div className="components-base-control">
							<MediaUploadCheck>
								<p className="mb-10">Upload an image</p>
								<MediaUpload
									allowedTypes={ ALLOWED_MEDIA_TYPES }
									onSelect={ onSelectUploadedImage }
									type='image'
									value={ uploadedImage }
									render={ ( { open } ) => (
										<Button
											onClick={ open }
											icon='upload'
											className='editor-media-placeholder__button is-button is-default is-large is-secondary'
										>
											{ __( uploadText, 'dwt-custom-theme' ) }
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{ uploadedImage && (
								<Button
									onClick={ onRemoveUploadedImage } isLink isDestructive
									className='flex mt-10'
								>
									{ __( 'Remove image', 'dwt-custom-theme' ) }
								</Button>
							) }

						</div>
						{ ! isEmpty( uploadedImage ) && (
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
				) }

				{ imageSelection === 'isbn' && (
					<>
						<PanelBody>
							{ ! apiImage && (
								<>
									<TextControl
										className={ isError ? 'has-error' : ''}
										label={ __( 'ISBN', 'dwt-custom-theme' ) }
										value= { isbn }
										onChange={ onChangeIsbn }
										help={ __( requiredHelpText, 'dwt-custom-theme' ) }
									/>
									<Button
										onClick={ onFetchapiImage }
										className='editor-media-placeholder__button is-button is-default is-large is-secondary rounded is-button-fetch'
									>
										{ __( 'Fetch book cover', 'dwt-custom-theme' ) }
									</Button>
								</>

							) }

							{ apiImage && (
								<>
									<div className="isbn mb-10">
										<h2>ISBN</h2>
										<p>{ isbn }</p>
									</div>
									<Button
										onClick={ onRemoveapiImage } isLink isDestructive
										className='flex mt-10'
									>
										{ __( 'Remove image', 'dwt-custom-theme' ) }
									</Button>
								</>
							) }
						</PanelBody>
						{ apiImage && (
							<>
								<PanelBody>
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
								</PanelBody>
								<PanelBody>
									<TextControl
										label={ __( 'Alt Text', 'dwt-custom-theme' ) }
										value= { coverAltText }
										onChange={ onChangeAltText }
										help={ __( 'Add alt text', 'dwt-custom-theme' ) }
									/>
								</PanelBody>
							</>
						) }

					</>
				) }
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ `book-cover--inner ${ showPlaceholder ? 'has-placeholder' : '' }` }>
					<div className='image-wrapper'>

						{ showPlaceholder && (
							<Placeholder
								title={ __( 'Image', 'dwt-custom-theme' ) }
								text={ __( 'Upload an image or enter an ISBN from the side panel.', 'dwt-custom-theme' ) }
								icon='format-image'
							/>
						) }

						{ ! showPlaceholder && (
							<img className={ imageClass } src={ imageSrc } alt={ imageAltText } title={ bookTitle } data-isbn={ isbn } data-workid={ workId } loading='lazy' />
						) }

					</div>

				</div>
			</div>
		</>
	);
};

export default Edit;
