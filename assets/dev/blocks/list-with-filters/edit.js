/**
 * Module: Grid
 * Child blocks
 * - Heading with Paragraph block
 * - Book list block
 * - Button block
 */

/**
 * External dependencies
 */

/**
 * DWT dependencies
 */

import {
	getInnerBlocks,
	lockInnerBlocks,
	passAttrsToInnerBlocks,
} from '../utils/block-utils';

import { capitalizeFirstLetter } from '.././utils/general-utils';

import ListInspectorControls from '../block-components/ListInspectorControls';
import Breadcrumbs from '../block-components/Breadcrumbs';

/**
 * WP dependencies
 */

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	CheckboxControl,
	CustomSelectControl,
	PanelBody,
	RadioControl,
	SelectControl,
} from '@wordpress/components';

import { select } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const {
		featureBy,
		filterBy,
		divisionCode,
		imprintCode,
		seriesCode,
		categoryCode,
		showMetadata,
		showCovers,
		filterByOptions,
		additionalFilterOptions,
	} = attributes;

	/**
	 * General settings/styles
	 */

	const obj = {
		featureBy,
		filterBy,
		divisionCode,
		imprintCode,
		seriesCode,
		categoryCode,
		showMetadata,
		showCovers,
		filterByOptions,
	};

	passAttrsToInnerBlocks( clientId, obj );

	/**
	 * Block settings/styles
	 */

	const blockProps = useBlockProps( {
		className: `block__list-with-filters flex justify-center mt-25 mb-60`,
	} );

	/**
	 * innerBlocks settings/styles
	 */

	const innerBlocks = getInnerBlocks( clientId );

	const template =
	[
		[ 'dwt/list', {} ],
	];

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: `inner-blocks-wrapper` },
		{
			allowedBlocks: [],
			template,
		}
	);

	lockInnerBlocks( innerBlocks, 1, true );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Main settings', 'dwt-custom-theme' ) }>
					<ListInspectorControls
						setAttributes={ setAttributes }
						featureBy={ featureBy }
						filterBy={ filterBy }
						divisionCode={ divisionCode }
						imprintCode={ imprintCode }
						seriesCode={ seriesCode }
						categoryCode={ categoryCode }
						showMetadata={ showMetadata }
						showCovers={ showCovers }
						filterByOptions={ filterByOptions }
						innerBlocks={ [] }
					/>
				</PanelBody>
			</InspectorControls>			

			<div { ...blockProps }>
				<div className='list-with-filters--inner'>
					<div className='list-with-filters__heading'>
						<h3 className='heading-3 m-0'>{ capitalizeFirstLetter( featureBy ) }</h3>
					</div>
					<div className='list-with-filters__filters mr-20'>
						<ul className='list-none p-0'>
							<li className='py-20 border-b solid border-b-lightgray'>Filter By:</li>
							<li className='py-20 bg-light-gray my-5'></li>
							<li className='py-20 bg-light-gray my-5'></li>
							<li className='py-20 bg-light-gray my-5'></li>													
						</ul>
					</div>
					<div className='list-with-filters__sort'>
						<span className='p-10 bg-light-gray border border-solid'>Sort By</span>
					</div>
					<div { ...innerBlocksProps }>
						{ children }
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
