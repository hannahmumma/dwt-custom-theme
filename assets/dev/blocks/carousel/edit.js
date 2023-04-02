/**
 * Module: Carousel
 * Child blocks:
 * - Button block
 * - Heading with Paragraph block
 * - list block
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

import { arrowRightCarouselIcon, arrowLeftCarouselIcon } from '../../img/icons';

import ListInspectorControls from '../block-components/ListInspectorControls';

/**
 * WP dependencies
 */

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const {
		isCarousel,
		featureBy,
		filterBy,
		divisionCode,
		imprintCode,
		seriesCode,
		showMetadata,
		showCovers,
		filterByOptions,
		layout,
		horizontalRule,
		hasCTASlide,
	} = attributes;

	/**
	 * General settings/styles
	 */

	const obj = {
		isCarousel,
		featureBy,
		filterBy,
		divisionCode,
		imprintCode,
		seriesCode,
		showMetadata,
		showCovers,
		filterByOptions,
		hasCTASlide,
	};

	passAttrsToInnerBlocks( clientId, obj );

	/**
	 * Block settings/styles
	 */

	const blockProps = useBlockProps( {
		className: `block__carousel py-40 md:py-60`,
	} );

	/**
	 * innerBlocks settings/styles
	 */

	const innerBlocks = getInnerBlocks( clientId );
	const template =
	[
		[ 'dwt/heading-with-paragraph', {} ],
		[ 'dwt/list', {} ],
		[ 'dwt/button', {} ],
	];

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: `inner-blocks-wrapper relative ${ layout }` },
		{
			allowedBlocks: [],
			renderAppender: false,
			template,
		}
	);

	// console.log(innerBlocks)
	let booklistInnerBlocks = [];
	let ctaSlide = [];

	Object.entries( innerBlocks ).map( ( [ key, value ] ) => {
		if ( value.name === 'dwt/list' ) {
			ctaSlide = value.attributes.ctaSlideText;
			booklistInnerBlocks = value.innerBlocks;
		}
	} );

	/**
	 * handle layout
	 */

	const handleLayout = ( newLayout ) => setAttributes( { layout: newLayout } );	

	lockInnerBlocks( innerBlocks, 3, true );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Main settings', 'dwt-custom-theme' ) }>
					<ListInspectorControls
						setAttributes={ setAttributes }
						isCarousel={ isCarousel }
						featureBy={ featureBy }
						filterBy={ filterBy }
						divisionCode={ divisionCode }
						imprintCode={ imprintCode }
						seriesCode={ seriesCode }
						showMetadata={ showMetadata }
						showCovers={ showCovers }
						filterByOptions={ filterByOptions }
						innerBlocks={ booklistInnerBlocks }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Styling settings', 'dwt-custom-theme' ) }>
					<SelectControl
						label={__( 'Layout', 'dwt-custom-theme' ) }
						value={ layout }
						options={ [
							{ label: 'Left Aligned', value: 'is-left-aligned' },
							{ label: 'Center Aligned', value: 'is-center-aligned' },
						] }
						onChange={ handleLayout }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						className="editor-toggle-button"
						label={ __( 'Divider', 'dwt-custom-theme' ) }
						help={__( 'Displays a thin line at the bottom of the module' ) }
						checked={ horizontalRule }
						onChange={ () => {
							setAttributes( { horizontalRule: ! horizontalRule } );
						} }
					/>
					<ToggleControl
						className="editor-toggle-button"
						label={ __( 'Carousel CTA', 'dwt-custom-theme' ) }
						help={__( 'Displays a CTA at the end of the carousel' ) }
						checked={ hasCTASlide }
						onChange={ () => {
							setAttributes( { hasCTASlide: ! hasCTASlide } );
							ctaSlide.length = 0;
						} }
					/>
				</PanelBody>

			</InspectorControls>

			<div { ...blockProps }>
				<div className='carousel--inner'>
					<div { ...innerBlocksProps }>
						{ children }
					</div>
				</div>
			</div>

			{ horizontalRule && (
				<hr style={ { border: '1px solid' } } />
			) }
		</>
	);
};

export default Edit;
