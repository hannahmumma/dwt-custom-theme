/**
 * Module: Image with Text
 * Parent Block(s):
 * - NA
 *
 *  Child Block(s):
 * - Text with CTA
 * - Features image
 */

/**
 * DWT dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';

import {
	getInnerBlocks,
	passAttrsToInnerBlocks,
	lockInnerBlocks,
} from '../utils/block-utils';

/**
 * WP dependencies
 */

import {
	ColorPalette,
	InspectorControls,
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
		layout,
		borderColor,
		textWithButtonBackgroundColor,
	} = attributes;

	/**
	 * General settings
	 */

	const obj = {
		layout,
		borderColor,
		textWithButtonBackgroundColor,
	};

	passAttrsToInnerBlocks( clientId, obj );
	const innerBlocks = getInnerBlocks( clientId );

	let bookBlocks;
	let backgroundColor;

	Object.entries( innerBlocks ).map( ( [ key, value ] ) => {
		if ( value.name === 'dwt/featured-image' ) {
			bookBlocks = value.innerBlocks;
		}

		if ( value.name === 'dwt/text-with-cta' ) {
			backgroundColor = value.attributes.backgroundColor;
		}
	} );

	setAttributes( { textWithButtonBackgroundColor: backgroundColor } );

	/**
	 * Block settings/styles
	 */

	const blockProps = useBlockProps( {
		className: 'block__image-with-text',
	} );

	/**
	 * innerBlocks settings/styles
	 */

	const is5050 = layout === '50-50' ? 'is-50-50' : '';
	const is6040 = layout === '40-60' ? 'is-40-60' : '';
	const isLayered = layout === 'layered' ? 'is-layered' : '';

	const layoutClasses = filterOutWhiteSpace( [
		is5050,
		is6040,
		isLayered,
	] );

	const template =
		[
			[ 'dwt/text-with-cta', {} ],
			[ 'dwt/featured-image', {} ],
		];

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: `inner-blocks-wrapper ${ layoutClasses }` },
		{
			allowedBlocks: [],
			renderAppender: false,
			template,
		}
	);

	/**
	 * Border settings
	 */

	const onChangeBorderColor = ( newBorderColor ) => {
		setAttributes( { borderColor: newBorderColor } );
	};

	const onClickBorderReset = () => {
		setAttributes( { borderColor: undefined } );
	};

	/**
	 * Handle layout
	 */

	const onSelectLayout = ( newLayout ) => {
		setAttributes( { layout: newLayout } );
		bookBlocks.length = 0;
	};

	/**
	 * Handle element styles
	 */

	const borderBottomColor = borderColor && layout !== 'layered' ? { borderBottomColor: borderColor } : undefined;
	const borderBottomWidth = borderColor && layout !== 'layered' ? { borderBottomWidth: '6px' } : undefined;

	// For layered layout we need to grab the background color from the text with cta block and apply it to the row which contains the featured image block
	// We also need to set the color property of inner-blocks-wrapper to the value of the block's border so we can apply that to the layered border
	const layeredBgColor = textWithButtonBackgroundColor && isLayered ? { backgroundColor: textWithButtonBackgroundColor } : undefined;
	const layeredBorderColor = borderColor && isLayered ? { color: borderColor } : undefined;

	/**
	 * Handle locking
	 */

	lockInnerBlocks( innerBlocks, 2 );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'dwt-custom-theme' ) }>
					<SelectControl
						label={__( 'Layout', 'dwt-custom-theme' ) }
						value={ layout }
						options={ [
							{ label: '50/50', value: '50-50' },
							{ label: '40/60', value: '40-60' },
							{ label: 'Layered', value: 'layered' },
						] }
						onChange={ onSelectLayout }
						__nextHasNoMarginBottom
					/>

					<div className="components-base-control">
						<h4 className='editor-subtitle'>Border Color</h4>
						<ColorPalette
							value={ borderColor }
							onChange={ onChangeBorderColor }
							clearable={ false }
						/>
					</div>
					<div className='flex justify-end mt-10'>
						<Button
							onClick={ onClickBorderReset }
							className='is-secondary is-small'
						>
							{ __( 'Reset border', 'dwt-custom-theme' ) }
						</Button>
					</div>

				</PanelBody>

			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `image-with-text--inner ${ borderColor ? 'has-border' : '' }` } style={ { ...borderBottomColor, ...borderBottomWidth, ...layeredBgColor, ...layeredBorderColor } }>
					<div { ...innerBlocksProps }>
						{ children }
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
