/**
 * Module: Book
 * Parent Block(s):
 * - list
 */

/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * DWT dependencies
 */

import { getBlockAttrs, getParentBlock, getBlockParentsByName, getAllMissingAttrsState } from '../utils/block-utils';
import { formatDescription } from '../utils/general-utils';

/**
 * DWT components
 */

import Placeholder from '../block-components/Placeholder';
import RequiredFields from '../block-components/RequiredFields';

/**
 * WP dependencies
 */

import apiFetch from '@wordpress/api-fetch';

import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	TextControl,
} from '@wordpress/components';

import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const {
		apiImage,
		isbn,
		title,
		author,
		format,
		awardWinner,
		bestseller,
		description,
		workId,
		showMetadata,
		allowedMetadataFields,
		uploadedImage,
		altTextManual,
	} = attributes;

	const missingAttrsState = getAllMissingAttrsState( [ isbn ] );

	const listBlock = getBlockParentsByName( clientId, 'dwt/list' );
	const listAttrs = getBlockAttrs( listBlock );
	setAttributes( { showMetadata: listAttrs?.showMetadata } );
	setAttributes( { allowedMetadataFields: listAttrs?.allowedMetadataFields } );

	const isEmptyImage = isEmpty( uploadedImage );

	const blockProps = useBlockProps( {
		className: `block__book`,
	} );

	/**
	 * Image settings
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
	const onChangeAltTextManul = ( newAltTextManual ) => setAttributes( { altTextManual: newAltTextManual } );

	/**
	 * API image settings
	 */

	const onChangeIsbn = ( newIsbn ) => setAttributes( { isbn: newIsbn } );

	const [ isError, setError ] = useState( false );
	const [ data, setData ] = useState( [] );

	const onFetchApiImage = async () => {
		await apiFetch( {
			path: '/dwt/v2/single-title',
			method: 'POST',
			data: { isbn },
		} )
			.then( ( response ) => {
				// console.log( response );
				if ( isError ) {
					setError( false );
				}

				return setData( response );
			} )
			.catch( ( error ) => {
			// console.log( error );
				setError( true );
			} );
	};

	const onRemoveApiImage = () => {
		setAttributes( {
			apiImage: undefined,
			title: undefined,
			author: undefined,
			isbn: undefined,
			uploadedImage: undefined,
		} );
	};

	const getFormat = ( bookData ) => {
		let bookFormat;

		for ( const [ key, value ] of Object.entries( bookData.formats ) ) {
			const isbns = Object.keys( value );
			if ( isbns.includes( isbn ) ) {
				bookFormat = key;
			}
		}

		return bookFormat;
	};

	useEffect( () => {
		if ( isEmpty( data ) ) {
			return;
		}

		setAttributes( {
			title: data?.title,
			author: data.frontlistiestTitle?.author,
			format: getFormat( data ),
			awardWinner: ! isEmpty( data?.bookAwards ),
			bestseller: data.frontlistiestTitle?.bestseller,
			description: formatDescription( data.frontlistiestTitle?.aboutTheBook ),
			workId: data?.workId,
			apiImage: isbn ? `https://images.randomhouse.com/cover/${ isbn }` : undefined,
		} );
	} );

	/**
	 * Handle additional logic
	 */

	const inValidHelpText = isError ? 'Please enter a valid ISBN' : 'Required';
	const showPlaceholder = isEmptyImage && ! apiImage ? true : false;

	const apiImageAltText = `${ title } by ${ author }`;
	const imageSrc = ! isEmptyImage ? uploadedImage.sizes.full.url : apiImage;
	const imageAltText = altTextManual ? altTextManual : altTextManual === '' || ! altTextManual ? apiImageAltText : uploadedImage.alt;

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
					{ ! apiImage && (
						<>
							<TextControl
								className={ isError ? 'has-error' : ''}
								label={ __( 'ISBN', 'dwt-custom-theme' ) }
								value= { isbn }
								onChange={ onChangeIsbn }
								help={ __( inValidHelpText, 'dwt-custom-theme' ) }
							/>
							<Button
								onClick={ onFetchApiImage }
								className='editor-media-placeholder__button is-button is-default is-large is-secondary rounded is-button-fetch'
							>
								{ __( 'Fetch book', 'dwt-custom-theme' ) }
							</Button>
						</>
					) }
					{ apiImage && (
						<>
							<div className="isbn mb-24">
								<h2>{ title }</h2>
								<h2>ISBN</h2>
								<p className="mb-5">{ isbn }</p>
								<Button
									onClick={ onRemoveApiImage } isLink isDestructive
									className='flex mb-10'
								>
									{ __( 'Remove ISBN', 'dwt-custom-theme' ) }
								</Button>
							</div>

							<div className="components-base-control">
								<MediaUploadCheck>
									<p className="mb-10">Use an uploaded image.</p>
									<MediaUpload
										allowedTypes={ ALLOWED_MEDIA_TYPES }
										onSelect={ onSelectUploadedImage }
										type='image'
										value={ uploadedImage }
										render={ ( { open } ) => (
											<Button
												onClick={ open }
												icon='upload'
												className='editor-media-placeholder__button is-button is-default is-large is-secondary is-upload-button'
											>
												{ __( uploadText, 'dwt-custom-theme' ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
								{ ! isEmptyImage && (
									<>
										<Button
											onClick={ onRemoveUploadedImage }
											isLink
											isDestructive
											className='is-remove-button'
										>
											{ __( 'Remove uploaded image', 'dwt-custom-theme' ) }
										</Button>
										<p className="text-12 text-gray">Removing uploaded image defaults back to image from the API</p>
									</>
								) }
							</div>
							<TextControl
								label={ __( 'Alt Text', 'dwt-custom-theme' ) }
								value= { altTextManual }
								onChange={ onChangeAltTextManul }
								help={ __( 'Add alt text', 'dwt-custom-theme' ) }
							/>
						</>
					) }
				</PanelBody>

			</InspectorControls>

			<div { ...blockProps }>
				<div className='book--inner'>
					{ showPlaceholder && (

						<Placeholder
							title={ __( 'Image', 'dwt-custom-theme' ) }
							text={ __( 'Enter an ISBN from the side panel.', 'dwt-custom-theme' ) }
							icon='format-image'
						/>

					) }

					{ ! showPlaceholder && (
						<>
							<div class="image-wrapper bg-light-gray aspect-[81/100]">
								<div className="api-image-wrapper w-full">
									<img className='api-image shadow-book-img w-[60%]' src={ imageSrc } alt={ imageAltText } data-format={ format } data-isbn={ isbn } data-workid={ workId } loading="lazy" />
								</div>
							</div>

							{ showMetadata && (
								<div className="book-details pt-16 w-full">
									{ title && allowedMetadataFields.includes( 'Title' ) && (
										<p className="book-details__title paragraph-1 text-16 mt-0 mb-0">{ title }</p>
									) }

									{ author && allowedMetadataFields.includes( 'Contributor Name' ) && (
										<p className="book-details__author paragraph-2 text-[0.9rem] mt-[0.1rem] mb-0">{ author }</p>
									) }

									{ format && allowedMetadataFields.includes( 'Format' ) && (
										<p className="book-details__format paragraph-2 text-[0.9rem] mt-[0.1rem] mb-0 text-[#606060]">{ format }</p>
									) }
								</div>
							) }
						</>
					) }

				</div>

			</div>
		</>
	);
};

export default Edit;
