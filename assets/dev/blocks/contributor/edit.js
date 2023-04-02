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

import { formatDescription } from '../utils/general-utils';
import { getBlockAttrs, getBlockParentsByName } from '../utils/block-utils';

/**
 * DWT components
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
		hasAuthorPhoto,
		apiImage,
		authorId,
		display,
		firstInitial,
		lastInitial,
		spotlight,
		photoCredit,
		photoDate,
		firstWorkCover,
		showMetadata,
		allowedContributorRoles,
		uploadedImage,
		altTextManual,
	} = attributes;

	const listBlock = getBlockParentsByName( clientId, 'dwt/list' );
	const listAttrs = getBlockAttrs( listBlock );
	setAttributes( { showMetadata: listAttrs?.showMetadata } );
	setAttributes( { allowedContributorRoles: listAttrs?.allowedContributorRoles } );

	const isEmptyImage = isEmpty( uploadedImage );

	const blockProps = useBlockProps( {
		className: `block__contributor flex`,
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

	const handleAuthorId = ( newAuthorId ) => setAttributes( { authorId: newAuthorId } );
	const [ data, setData ] = useState( {} );
	const [ isError, setError ] = useState( false );

	const onFetchApiImage = async () => {
		await apiFetch( {
			path: '/dwt/v2/single-author',
			method: 'POST',
			data: { authorId },
		} )
			.then( ( response ) => {
			// console.log( response );

				if ( isError ) {
					setError( false );
				}

				const clientAuthorsProp = response.clientAuthors[ Object.keys( response.clientAuthors )[ 0 ] ];
				return response.works.length === 0 && ! isEmpty( clientAuthorsProp ) ? setData( clientAuthorsProp ) : setData( response );
			} )
			.catch( ( error ) => {
			// console.log( error );
				setError( true );
			} );
	};

	useEffect( () => {
		if ( isEmpty( data ) ) {
			return;
		}

		setAttributes( {
			hasAuthorPhoto: data.hasAuthorPhoto,
			apiImage: getApiImage( data ),
			firstWorkCover: getFirstWork( data ),
			authorId: data?.authorId?.toString(),
			display: data?.display,
			firstInitial: data?.firstInitial ?? '',
			lastInitial: data?.lastInitial ?? '',
			spotlight: formatDescription( data?.spotlight ),
			photoCredit: data?.photoCredit,
			photoDate: data?.photoDate,
		} );
	}, [ data ] );

	const getApiImage = ( contributorData ) => {
		const apiImageUrl = ! data.hasAuthorPhoto ? getFirstWork( contributorData ) : `https://images.randomhouse.com/author/${ contributorData.authorId }`;
		return `${ apiImageUrl }`;
	};

	const getFirstWork = ( contributorData ) => contributorData.works.length > 0 ? `https://images.randomhouse.com/cover/${ contributorData.works[ 0 ].isbn }?blur_rad=0&blur_sig=20` : null;

	const onRemoveApiImage = () => {
		setAttributes( {
			apiImage: undefined,
			authorId: undefined,
			uploadedImage: undefined,
		} );
	};

	/**
	 * Handle additional logic
	 */

	const inValidHelpText = isError ? 'Please enter a valid Contributor ID' : 'Required';
	const showPlaceholder = isEmptyImage && ! apiImage ? true : false;

	const imageSrc = ! isEmptyImage ? uploadedImage.sizes.full.url : apiImage;
	const imageAltText = altTextManual ? altTextManual : altTextManual === '' || ! altTextManual ? display : uploadedImage.alt;

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
								label={ __( 'Contributor ID', 'dwt-custom-theme' ) }
								value= { authorId }
								onChange={ handleAuthorId }
								help={ __( inValidHelpText, 'dwt-custom-theme' ) }
							/>
							<Button
								onClick={ onFetchApiImage }
								className='editor-media-placeholder__button is-button is-default is-large is-secondary rounded is-button-fetch'
							>
								{ __( 'Fetch Contributor', 'dwt-custom-theme' ) }
							</Button>
						</>
					) }
					{ apiImage && (
						<>
							<div className="author-id mb-24">
								<h2>{ display }</h2>
								<h2>{ `ID: ${ authorId }` }</h2>
								<Button
									onClick={ onRemoveApiImage } isLink isDestructive
									className='flex mb-10'
								>
									{ __( 'Remove Contributor', 'dwt-custom-theme' ) }
								</Button>
							</div>

							<div className="components-base-control">
								<MediaUploadCheck>
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
									<p className='text-12 text-gray mt-8'>Use an uploaded image</p>
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
				<div className='contributor--inner'>
					{ showPlaceholder && (

						<Placeholder
							title={ __( 'Image', 'dwt-custom-theme' ) }
							text={ __( 'Enter a contributor ID from the side panel.', 'dwt-custom-theme' ) }
							icon='format-image'
						/>

					) }

					{ ! showPlaceholder && (
						<>
							<div class="image-wrapper flex aspect-[81/100] overflow-hidden">
								<div className="api-image-wrapper flex relative w-full">
									<img className='api-image' src={ imageSrc } alt={ imageAltText } data-authorid={ authorId } loading="lazy" />
									{ ! hasAuthorPhoto && (
										<span className='heading-1 m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{ firstInitial + lastInitial }</span>
									) }
								</div>
							</div>

							{ showMetadata && (
								<div className="contributor-details pt-16 w-full">
									{ display && (
										<p className="contributor-details__title paragraph-1 text-16 mt-0 mb-0">{ display }</p>
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
