/**
 * Module: list
 *
 * Parent blocks
 * - Carousel
 * - Grid
 *
 * Child blocks(s)
 * - Book
 * - Contributor
 */

/**
 * External dependencies
 */

/**
 * DWT dependencies
 */

import {
	getInnerBlocks,
	getParentBlockAttrs,
	lockInnerBlocks,
} from '../utils/block-utils';

import { arrowRightIcon } from '../../img/icons';

/**
 * DWT components
 */

import FilterInfo from '../block-components/FilterInfo';

/**
 * WP dependencies
 */

import apiFetch from '@wordpress/api-fetch';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	URLInput,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import { dispatch, select } from '@wordpress/data';

import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const {
		ctaSlideText,
		ctaLinkUrl,
		ctaLinkTarget,
		allowedMetadataFields,
		allowedContributorRoles,
		innerBlocksAttrs,
		parentAttrs,
	} = attributes;

	const parentBlockAttrs = getParentBlockAttrs( clientId );
	const featureByFromParent = parentBlockAttrs?.featureBy;
	const filterByFromParent = parentBlockAttrs?.filterBy;
	const filterByOptionsFromParent = parentBlockAttrs?.filterByOptions;
	const hasCTASlideFromCarousel = parentBlockAttrs?.hasCTASlide;
	const listType = filterByFromParent === 'custom' ? 'is-manual' : 'is-automatic';
	const isImprint = select( 'core/editor' ).getCurrentPostType() === 'imprint';

	setAttributes( { parentAttrs: parentBlockAttrs } );

	const blockProps = useBlockProps( {
		className: `block__list ${ listType }`,
	} );

	/**
	 * innerBlocks settings/styles
	 */

	const innerBlocks = getInnerBlocks( clientId );
	const renderAppender = innerBlocks.length < 12 ? undefined : false;
	const bookArr = new Array( 12 );
	const contribArr = new Array( 12 );

	const handleTemplate = () => {
		if ( filterByFromParent !== 'custom' || isImprint ) {
			return [];
		}

		return featureByFromParent === 'books' ? bookArr.fill( [ 'dwt/book', {} ] ) : contribArr.fill( [ 'dwt/contributor', {} ] );
	};

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: `inner-blocks-wrapper relative w-full h-full` },
		{
			allowedBlocks: [],
			renderAppender,
			template: handleTemplate(),
		}
	);

	const onChangeCTASlideText = ( newCTASlideText ) => {
		setAttributes( { ctaSlideText: newCTASlideText } );

		if ( ! hasCTASlideFromCarousel ) {
			setAttributes( { ctaSlideText: undefined } );
		}
	};

	/**
	 * Handle additional logic
	 */

	/**
	 * Handle element styles
	 */

	/**
	 * Handle element classes
	 */

	lockInnerBlocks( innerBlocks, 1, false );

	useEffect( () => {
		const arr = [];

		Object.entries( innerBlocks ).map( ( [ key, value ] ) => {
			const apiImage = featureByFromParent === 'books' ? value?.attributes.apiImage : value?.attributes.apiImage;

			if ( apiImage ) {
				arr.push( value.attributes );
			}
		} );

		setAttributes( { innerBlocksAttrs: arr } );
	}, [ innerBlocks ] );

	useEffect( () => {
		apiFetch( {
			path: '/acf/v3/options/options',
			method: 'GET',
		} )
			.then( ( response ) => {
			// console.log( response );
				setAttributes( {
					allowedMetadataFields: response.acf?.metadata_fields,
					allowedContributorRoles: response.acf?.contributor_roles,
				} );
			} )
			.catch( ( error ) => {
			// console.log( error );
			} );
	}, [] );

	return (
		<>
			<InspectorControls>
				{ hasCTASlideFromCarousel && (
					<PanelBody>
						<URLInput
							label={ __( 'Link CTA Slide', 'dwt-custom-theme' ) }
							placeholder={ __( 'Enter a path or full URL', 'dwt-custom-theme' ) }
							value={ ctaLinkUrl }
							onChange={ ( url ) => setAttributes( { ctaLinkUrl: url } ) }
							disableSuggestions={ true }
						/>
						<ToggleControl
							className="editor-toggle-button"
							label={ __( 'Link Target', 'dwt-custom-theme' ) }
							help={__( 'Open url in a new window.', 'dwt-custom-theme' ) }
							checked={ ctaLinkTarget }
							onChange={ () => {
								setAttributes( { ctaLinkTarget: ! ctaLinkTarget } );
							} }
						/>
					</PanelBody>
				) }
			</InspectorControls>

			<div { ...blockProps }>
				<div className='list--inner w-full h-full flex'>

					{ filterByFromParent === 'custom' && (
						<div { ...innerBlocksProps }>
							{ children }
						</div>
					) }

					{ filterByFromParent !== 'custom' && (
						<FilterInfo
							filterByOptionsFromParent={ filterByOptionsFromParent }
							filterByFromParent={ filterByFromParent }
						/>
					) }

					{ hasCTASlideFromCarousel && (
						<div class='is-slide-for-cta block__book w-full h-full max-w-[284px] aspect-[81/100] flex justify-center self-start items-center'>
							<div className='is-slide-for-cta--inner w-full flex self-start'>

								<div className='cta-wrapper w-full h-full'>
									<RichText
										className='paragraph-2 cta-button-slide__text mr-10 break-normal'
										tagName='p'
										placeholder={ __( 'Add CTA text', 'dwt-custom-theme' ) }
										allowedFormats={ [ 'core/bold' ] }
										value={ ctaSlideText }
										onChange={ onChangeCTASlideText }
									/>
									{ arrowRightIcon }
								</div>
							</div>
						</div>
					) }

				</div>
			</div>
		</>
	);
};

export default Edit;
