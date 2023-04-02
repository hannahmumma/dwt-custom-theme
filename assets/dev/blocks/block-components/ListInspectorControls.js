import {
	RichText,
} from '@wordpress/block-editor';

import {
	RadioControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import { select } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

/**
 * DWTRequiredFields
 *
 * A DWT reusable component
 *
 * @param {Object}  props
 * @param {Object}  props.setAttributes
 * @param {boolean} props.isCarousel
 * @param {string}  props.featureBy
 * @param {string}  props.filterBy
 * @param {string}  props.divisionCode
 * @param {string}  props.imprintCode
 * @param {string}  props.seriesCode
 * @param {boolean} props.showMetadata
 * @param {boolean} props.showCovers
 * @param {Array}   props.filterByOptions
 * @param {boolean} props.hasCTASlide
 * @param {Array}   props.ctaSlide
 * @param {Array}   props.innerBlocks
 */
const listInspectorControls = ( {
	setAttributes,
	isCarousel,
	featureBy,
	filterBy,
	divisionCode,
	imprintCode,
	seriesCode,
	categoryCode,
	showMetadata,
	showCovers,
	filterByOptions,
	layout,
	hasCTASlide,
	ctaSlide,
	innerBlocks,
} ) => {

	const isImprintPost = select( 'core/editor' ).getCurrentPostType() === 'imprint';
	const imprintCodeField = select( 'core/editor' ).getEditedPostAttribute( 'acf' ).imprint_code;

	const isCategoryPost = select( 'core/editor' ).getCurrentPostType() === 'bookcategory';
	const bisacField = select( 'core/editor' ).getEditedPostAttribute( 'acf' )?.bisac;
	// const subCategoriesField = select( 'core/editor' ).getEditedPostAttribute( 'acf' ).subcategories;

	// const bisac = bisacField ? [ bisacField ] : [];
	// const subcategories = subCategoriesField?.length > 0 ? subCategoriesField.map( ( item ) => item.bisac ) : [];

	// const bisacs = bisac.length > 0 && subcategories.length > 0 ? [ ...bisac, ...subcategories ] : 
	// 	bisac.length > 0 && subcategories?.length === 0 ? bisac : 
	// 	bisac.length === 0 && subcategories?.length > 0 ? subcategories : [];

	/**
	 * Feature by settings
	 */

	const handleFeatureBy = ( newFeatureBy ) => {
		setAttributes( { featureBy: newFeatureBy } );
		innerBlocks.length = 0;
	};

	/**
	 * Filters
	 */

	const listType = filterBy === 'custom' ? 'is-manual' : 'is-automatic';

	const handleFilterBy = ( newFilterBy ) => {
		setAttributes( { filterBy: newFilterBy } );

		if ( filterBy !== 'custom' ) {
			innerBlocks.length = 0;
		}
	};

	const handleDivisionCode = ( newDivisionCode ) => setAttributes( { divisionCode: newDivisionCode } );

	const handleImprintCode = ( newImprintCode ) => { 
		if ( isImprintPost ) {
			return;
		}
		setAttributes( { imprintCode: newImprintCode } );
	}

	const handleSeriesCode = ( newSeriesCode ) => setAttributes( { seriesCode: newSeriesCode } );

	/**
	 * Handle additional logic
	 */

	const filterByHelpText = filterBy === 'custom'
		? `Manually add up to 12 custom titles.`
		: `Automatic API lists are only displayed on the frontend. Click on Preview or View Page to see list.`;


	useEffect( () => {
		if ( isImprintPost) {
			setAttributes( { imprintCode: imprintCodeField }  );
		}
	}, [ imprintCodeField ] )

	useEffect( () => {
		if ( isCategoryPost) {
			setAttributes( { categoryCode: bisacField } );
		}
	}, [ bisacField ] );

	return (
		<>
			<RadioControl
				label={ __( 'Feature', 'dwt-custom-theme' ) }
				help={ __( 'Feature books or contributors', 'dwt-custom-theme' ) }
				selected={ featureBy }
				options={ [
					{ label: 'Books', value: 'books' },
					{ label: 'Contributors', value: 'contributors' },
				] }
				onChange={ handleFeatureBy }
			/>
			<SelectControl
				label={__( 'Filter by', 'dwt-custom-theme' ) }
				help={ __( filterByHelpText, 'dwt-custom-theme' ) }
				value={ filterBy }
				options={ filterByOptions }
				onChange={ handleFilterBy }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				className='editor-toggle-button'
				label={ __( 'Metadata Options', 'dwt-custom-theme' ) }
				help={__( showMetadata ? 'Metadata is displayed.' : 'Metadata is not displayed', 'dwt-custom-theme' ) }
				checked={ showMetadata }
				onChange={ () => {
					setAttributes( { showMetadata: ! showMetadata } );
				} }
			/>

			{ filterBy !== 'custom' && (
				<ToggleControl
					className='editor-toggle-button'
					label={ __( 'Cover/Headshot Image Options', 'dwt-custom-theme' ) }
					help={__( showCovers ? 'Items with covers or headshots are displayed' : 'All items are displayed', 'dwt-custom-theme' ) }
					checked={ showCovers }
					onChange={ () => {
						setAttributes( { showCovers: ! showCovers } );
					} }
				/>
			) }

			{ filterBy !== 'custom' && (
				<>
					<h4>Codes</h4>
					<p className="mb-24">Add one or more of each. For more than one code, use a comma to separate them.</p>
					<TextControl
						label={ __( 'Division', 'dwt-custom-theme' ) }
						help={ __( 'Add division code(s).', 'dwt-custom-theme' ) }
						value= { divisionCode }
						onChange={ handleDivisionCode }
					/>

					<TextControl
						label={ __( 'Imprint', 'dwt-custom-theme' ) }
						help={ ! isImprintPost ? __( 'Add imprint code(s).', 'dwt-custom-theme' ) : null }
						value= { isImprintPost ? imprintCodeField : imprintCode }
						onChange={ handleImprintCode }
						readOnly={ isImprintPost ? true : null }
					/>

					<TextControl
						label={ __( 'Series', 'dwt-custom-theme' ) }
						help={ __( 'Add series code(s).', 'dwt-custom-theme' ) }
						value= { seriesCode }
						onChange={ handleSeriesCode }
					/>

					{ isCategoryPost && (
						<TextControl
							label={ __( 'Category', 'dwt-custom-theme' ) }
							help={ __( 'BISAC code(s) are set at the post level', 'dwt-custom-theme' ) }
							value= { categoryCode }
							readOnly={ true }
						/>						
					) }
				
				</>

			) }
		</>
	);
};

export default listInspectorControls;
