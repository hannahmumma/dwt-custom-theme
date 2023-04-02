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
	RadioControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const {
		isGrid,
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
	} = attributes;

	/**
	 * General settings/styles
	 */

	const obj = {
		isGrid,
		featureBy,
		filterBy,
		divisionCode,
		imprintCode,
		seriesCode,
		showMetadata,
		showCovers,
		filterByOptions,
	};

	passAttrsToInnerBlocks( clientId, obj );

	/**
	 * Block settings/styles
	 */

	const blockProps = useBlockProps( {
		className: `block__grid flex py-40 md:py-60`,
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
			template,
		}
	);

	let listInnerBlocks;

	Object.entries( innerBlocks ).map( ( [ key, value ] ) => {
		if ( value.name === 'dwt/list' ) {
			listInnerBlocks = value.innerBlocks;
		}
	} );

	lockInnerBlocks( innerBlocks, 3, true );

	/**
	 * handle layout
	 */

	const handleLayout = ( newLayout ) => setAttributes( { layout: newLayout } );

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
						showMetadata={ showMetadata }
						showCovers={ showCovers }
						filterByOptions={ filterByOptions }
						innerBlocks={ listInnerBlocks }
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
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className='grid--inner'>
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
