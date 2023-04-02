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
 *
 * Notes:
 * - Automatic and manual lists are handled on the FE with React.
 * - The save function allows us to render div containers with data in data attributes.
 *
 * @see Book.js, Contributor.js, Carousel.js and/or Grid.js for FE rendering in components folder
 */

/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * DWT dependencies
 */

/**
 * WP dependencies
 */

import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		ctaSlideText,
		ctaLinkUrl,
		ctaLinkTarget,
		allowedMetadataFields,
		allowedContributorRoles,
		innerBlocksAttrs,
		parentAttrs,
	} = attributes;

	const linkObj = {
		text: ctaSlideText.length > 0 ? ctaSlideText.toString() : undefined,
		href: ctaLinkUrl ? ctaLinkUrl : undefined,
		target: ctaLinkTarget ? ctaLinkTarget : undefined,
	};

	console.log(parentAttrs)

	const jsonLink = ! isEmpty( linkObj ) ? JSON.stringify( linkObj ) : null;
	const dataModule = parentAttrs?.isCarousel ? 'carousel' : 'grid';
	const dataAllowedMetadataFields = parentAttrs?.featureBy === 'books' ? JSON.stringify( allowedMetadataFields ) : null;
	const dataAllowedContributorRoles = parentAttrs?.featureBy === 'contributors' ? JSON.stringify( allowedContributorRoles ) : null;
	const dataManualData = innerBlocksAttrs?.length ? JSON.stringify( innerBlocksAttrs ) : null;

	const blockProps = useBlockProps.save( {
		className: `block__list`,
	} );

	// Manual list
	const { children, ...innerBlocksProps } = useInnerBlocksProps.save( {
		className: 'inner-blocks-wrapper relative',
		'data-feature-by': parentAttrs.featureBy,
		'data-show-metadata': parentAttrs.showMetadata,
		'data-allowed-metadata-fields': dataAllowedMetadataFields,
		'data-allowed-contributor-roles': dataAllowedContributorRoles,
		'data-entry': 'manual',
		'data-list-type': 'small-list',
		'data-module': dataModule,
		'data-cta': jsonLink,
		'data-manual-data': dataManualData,
	} );

	/**
	 * Handle additional logic
	 */

	/**
	 * Handle element styles
	 */

	/**
	 * Handle element classes
	 */

	return (
		<div { ...blockProps }>

			<div className='list--inner'>

				{/*Automatic book list*/}
				{ parentAttrs?.filterBy !== 'custom' && (
					<div
						className='inner-blocks-wrapper relative'
						data-feature-by={ parentAttrs?.featureBy ? parentAttrs.featureBy : null }
						data-filter-by={ parentAttrs?.filterBy ? parentAttrs.filterBy : null }
						data-division-code={ parentAttrs?.divisionCode ? parentAttrs.divisionCode : null }
						data-imprint-code={ parentAttrs?.imprintCode ? parentAttrs.imprintCode : null }
						data-series-code={ parentAttrs?.seriesCode ? parentAttrs.seriesCode : null }
						data-category-code={ parentAttrs?.categoryCode ? parentAttrs.categoryCode : null }
						data-sort-by='onsale'
						data-direction='desc'
						data-show-metadata={ parentAttrs.showMetadata }
						data-allowed-metadata-fields={ dataAllowedMetadataFields }
						data-allowed-contributor-roles={ dataAllowedContributorRoles }
						data-show-covers={ parentAttrs.showCovers }
						data-entry='automatic'
						data-list-type={ parentAttrs?.isFilters ? 'full-list' : 'small-list' }
						data-module={ dataModule }
						data-cta={ jsonLink }
					>
					</div>
				) }

				{/*Manual book list*/}
				{ parentAttrs?.filterBy === 'custom' && (
					<div { ...innerBlocksProps }>

						{/*Hide to prevent flash of content*/}
						<div className='hidden'>
							{ children }
						</div>

					</div>
				) }

			</div>

		</div>
	);
};

export default save;
