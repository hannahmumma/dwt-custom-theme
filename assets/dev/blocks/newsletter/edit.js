/**
 * Module: Newsletter
 *  Child Block(s):
 *  - Email Form
 */

/**
 * DWT dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';

import {
	getInnerBlocks,
	getInnerBlockSelectedState,
	passAttrsToInnerBlocks,
	getAllMissingAttrsState,
} from '../utils/block-utils';

// Icon component doesn't work as expected so importing these separately. Will continue to debug the issue.
import defaultEnvelopeIcon from '../../img/defaultEnvelopeIcon.svg';
import circleEnvelopeIcon from '../../img/circleEnvelopeIcon.svg';
import starEnvelopeIcon from '../../img/starEnvelopeIcon.svg';
import paperPlaneIcon from '../../img/paperPlaneIcon.svg';
import DKColorLogo from '../../img/DKColorLogo.svg';

import colors from '../block-components/Colors';
import Placeholder from '../block-components/Placeholder';
import RequiredFields from '../block-components/RequiredFields';

/**
 * WP dependencies
 */

import {
	ColorPalette,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	Button,
	Modal,
	PanelBody,
	RadioControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, isSelected, clientId } ) => {
	const {
		siteIdApi,
		programIdApi,
		preferenceIdApi,
		preferenceKeyApi,
		preferenceTextApi,
		acquisitionCodeApi,
		welcomeEmailApi,
		backgroundColor,
		borderColor,
		borderStyle,
		borderWidth,
		image,
		alt,
		heading,
		headingColor,
		text,
		textColor,
		legalText,
		legalTextColor,
	} = attributes;

	const innerBlocks = getInnerBlocks( clientId );
	const missingAttrsState = getAllMissingAttrsState( [ siteIdApi, programIdApi, acquisitionCodeApi ] );
	const isSelectedEmailForm = getInnerBlockSelectedState( clientId );
	let isSelectedButton;

	Object.entries( innerBlocks ).map( ( [ key, value ] ) => {
		value.innerBlocks.map( ( item ) => {
			isSelectedButton = item.attributes?.buttonIsSelected;
		} );
	} );

	const blockProps = useBlockProps( {
		className: 'block__newsletter',
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: 'inner-blocks-wrapper' },
		{
			allowedBlocks: [],
			renderAppender: false,
			template: [ [ 'dwt/email-form' ] ],
			templateLock: 'all',
		}
	);

	const obj = {
		siteIdApi,
		programIdApi,
		preferenceIdApi,
		preferenceKeyApi,
		preferenceTextApi,
		acquisitionCodeApi,
		welcomeEmailApi,
	};

	passAttrsToInnerBlocks( clientId, obj );

	/**
	 * PRH Messaging API settings
	 */

	const enterUpdate = missingAttrsState ? 'Enter' : 'Update';

	const [ isOpen, setOpen ] = useState( false );
	const [ isError, setError ] = useState( false );

	const openModal = () => setOpen( true );

	const closeModal = () => {
		if ( ! missingAttrsState ) {
			setOpen( false );
		}

		if ( missingAttrsState ) {
			setError( true );
		}
	};

	const onChangeSiteId = ( newSiteId ) => setAttributes( { siteIdApi: newSiteId } );
	const onChangeProgramId = ( newProgramId ) => setAttributes( { programIdApi: newProgramId } );
	const onChangePreferenceId = ( newPreferenceId ) => setAttributes( { preferenceIdApi: newPreferenceId } );
	const onChangePreferenceKey = ( newPreferenceKey ) => setAttributes( { preferenceKeyApi: newPreferenceKey } );
	const onChangePreferenceText = ( newPreferenceText ) => setAttributes( { preferenceTextApi: newPreferenceText } );
	const onChangeAcquisitionCode = ( newAcquisitionCode ) => setAttributes( { acquisitionCodeApi: newAcquisitionCode } );

	/**
	 * Background settings
	 */

	const onChangeBackgroundColor = ( newBackgroundColor ) => setAttributes( { backgroundColor: newBackgroundColor } );

	/**
	 * Border settings
	 */

	const onChangeBorderStyle = ( newBorderStyle ) => {
		if ( newBorderStyle === 'shadow' && borderStyle !== '' ) {
			setAttributes( { borderWidth: undefined } );
		}

		setAttributes( { borderStyle: newBorderStyle } );
	};

	const onSelectBorderWidth = ( newBorderWidth ) => setAttributes( { borderWidth: newBorderWidth } );
	const onChangeBorderColor = ( newBorderColor ) => setAttributes( { borderColor: newBorderColor } );
	const onClickBorderReset = () => setAttributes( { borderColor: undefined, borderStyle: undefined, borderWidth: undefined } );

	/**
	 * Image settings
	 */

	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	const altText = alt ?? ' ';

	const onSelectImage = ( newImage ) => {
		const determineImage = typeof ( newImage ) === 'object' ? newImage.sizes.full.url : newImage;
		if ( determineImage === 'Select an icon' ) {
			setAttributes( { image: undefined } );
		} else {
			setAttributes( { image: determineImage, alt: determineImage?.alt } );
		}
	};

	const onRemoveImage = () => setAttributes( { image: undefined } );
	const outputImageTag = ( image && image !== 'Select an icon' ) ? <img src={ image } alt={ altText } /> : undefined;
	const uploadText = image ? 'Replace image' : 'Upload image';

	/**
	 * Heading/text settings
	 */

	const onChangeHeading = ( newHeading ) => setAttributes( { heading: newHeading } );
	const onChangeHeadingColor = ( newHeadingColor ) => setAttributes( { headingColor: newHeadingColor } );
	const onChangeText = ( newText ) => setAttributes( { text: newText } );
	const onChangeTextColor = ( newTextColor ) => setAttributes( { textColor: newTextColor } );

	/**
	 * Legal settings
	 */

	const onChangeLegalText = ( newLegalText ) => setAttributes( { legalText: newLegalText } );
	const onChangeLegalTextColor = ( newLegalTextColor ) => setAttributes( { legalTextColor: newLegalTextColor } );

	/**
	 * Handle element styles
	 */

	const bgColor = backgroundColor ? { backgroundColor } : undefined;
	const bColor = borderColor ? { borderColor } : undefined;

	const hColor = headingColor ? { color: headingColor } : undefined;
	const tColor = textColor ? { color: textColor } : undefined;
	const ltColor = legalTextColor ? { color: legalTextColor } : undefined;

	/**
	 * Handle element classes
	 */

	const newsletterInnerClasses = filterOutWhiteSpace( [
		'newsletter--inner',
		borderStyle,
		borderWidth,
	] );

	return (
		<>
			<InspectorControls>
				<RequiredFields
					missingAttrsState={ missingAttrsState }
					subtitle='The following fields are required to save the page.'
					requiredAttrs={ [ 'Site ID', 'Program ID', 'Acquisition Code' ] }
				/>

				<PanelBody title={ __( 'PRH messagaing API settings', 'dwt-custom-theme' ) } opened={ true }>
					<Button isLink onClick={ openModal }>
						{ `${ enterUpdate } program information` }
					</Button>

					{ isOpen && (
						<Modal
							title={ __( 'PRH Messaging', 'dwt-custom-theme' ) }
							onRequestClose={ closeModal }
							isDismissible={ false }
						>
							<p className="mb-10">Fields marked with * are required.</p>
							<p className="mb-10">Separate multiple segments with commas and groups with colons.</p>

							{ isError && missingAttrsState && (
								<p className='has-error mb-10'>Add information to missing, required fields.</p>
							) }

							<TextControl
								className={ ! siteIdApi && isError && ( 'has-error' ) }
								label={ __( 'Site ID*', 'dwt-custom-theme' ) }
								value= { siteIdApi }
								onChange={ onChangeSiteId }
								help={ __( 'required', 'dwt-custom-theme' ) }
							/>
							<TextControl
								className={ ! programIdApi && isError && ( 'has-error' ) }
								label={ __( 'Program ID*', 'dwt-custom-theme' ) }
								value= { programIdApi }
								onChange={ onChangeProgramId }
								help={ __( 'required', 'dwt-custom-theme' ) }
							/>
							<TextControl
								label={ __( 'Preference ID', 'dwt-custom-theme' ) }
								value= { preferenceIdApi }
								onChange={ onChangePreferenceId }
							/>
							<TextControl
								label={ __( 'Preference Key', 'dwt-custom-theme' ) }
								value= { preferenceKeyApi }
								onChange={ onChangePreferenceKey }
							/>
							<TextControl
								label={ __( 'Preference Text', 'dwt-custom-theme' ) }
								value= { preferenceTextApi }
								onChange={ onChangePreferenceText }
							/>
							<TextControl
								className={ ! acquisitionCodeApi && isError && ( 'has-error' ) }
								label={ __( 'Acquisition Code', 'dwt-custom-theme' ) }
								value= { acquisitionCodeApi }
								onChange={ onChangeAcquisitionCode }
								help={ __( 'required', 'dwt-custom-theme' ) }
							/>
							<ToggleControl
								className="editor-toggle-button"
								label="Welcome Email"
								help={
									welcomeEmailApi
										? 'Send welcome email.'
										: 'Don\'t send welcome email.'
								}
								checked={ welcomeEmailApi }
								onChange={ () => {
									setAttributes( { welcomeEmailApi: ! welcomeEmailApi } );
								} }
							/>
							<div className='mt-20'>
								<Button
									className={ missingAttrsState && ( 'is-disabled' ) }
									variant='secondary'
									onClick={ closeModal }
								>
								Save and close
								</Button>
							</div>
						</Modal>
					) }

				</PanelBody>

				<PanelColorGradientSettings
					title={ __( 'Color settings', 'dwt-custom-theme' ) }
					settings={ [
						{
							colorValue: backgroundColor,
							colors,
							label: __( 'Background', 'dwt-custom-theme' ),
							onColorChange: onChangeBackgroundColor,
							clearable: true,
						},
						{
							colorValue: headingColor,
							colors,
							label: __( 'Heading', 'dwt-custom-theme' ),
							onColorChange: onChangeHeadingColor,
							clearable: true,
						},
						{
							colorValue: textColor,
							colors,
							label: __( 'Text', 'dwt-custom-theme' ),
							onColorChange: onChangeTextColor,
							clearable: true,
						},
						{
							colorValue: legalTextColor,
							colors,
							label: __( 'Legal Text', 'dwt-custom-theme' ),
							onColorChange: onChangeLegalTextColor,
							clearable: true,
						},
					] }
				>
				</PanelColorGradientSettings>

				<PanelBody title={ __( 'Border settings', 'dwt-custom-theme' ) }>
					<RadioControl
						label={ __( 'Border Styles' ) }
						help={ __( 'Choose a solid border or drop shadow', 'dwt-custom-theme' ) }
						selected={ borderStyle }
						options={ [
							{ label: 'Border', value: 'has-border' },
							{ label: 'Drop Shadow', value: 'shadow' },
						] }
						onChange={ onChangeBorderStyle }
					/>
					{ borderStyle === 'has-border' && (
						<>
							<SelectControl
								label={__( 'Border width', 'dwt-custom-theme' ) }
								value={ borderWidth }
								options={ [
									{ label: 'Select a border width', value: '' },
									{ label: '1px', value: 'border-1px' },
									{ label: '2px', value: 'border-2px' },
									{ label: '4px', value: 'border-4px' },
								] }
								onChange={ onSelectBorderWidth }
								__nextHasNoMarginBottom
							/>
							<p>Border color</p>
							<ColorPalette
								value={ borderColor }
								onChange={ onChangeBorderColor }
								clearable={ false }
							/>
						</>
					) }
					<div className='flex justify-end mt-10'>
						<Button
							onClick={ onClickBorderReset }
							className='is-secondary is-small'
						>
							{ __( 'Reset borders', 'dwt-custom-theme' ) }
						</Button>
					</div>
				</PanelBody>
				<PanelBody
					title={ __( 'Icon/Logo settings', 'dwt-custom-theme' ) }>
					<SelectControl
						className='select-control__image'
						label={__( 'Select default icon or logo', 'dwt-custom-theme' ) }
						value={ image }
						options={ [
							{ label: 'Select an icon', value: '' },
							{ label: 'Envelope', value: defaultEnvelopeIcon },
							{ label: 'Circle Envelope', value: circleEnvelopeIcon },
							{ label: 'Star Envelope', value: starEnvelopeIcon },
							{ label: 'Paper plane', value: paperPlaneIcon },
							{ label: 'Logo', value: DKColorLogo },
						] }
						onChange={ onSelectImage }
						__nextHasNoMarginBottom
					/>
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							onSelect={ onSelectImage }
							type='image'
							value={ image }
							render={( { open } ) => (
								<Button
									onClick={ open }
									icon='upload'
									className='editor-media-placeholder__button is-button is-default is-large'
								>
									{ __( uploadText, 'dwt-custom-theme' ) }
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{ image && (
						<Button
							onClick={ onRemoveImage } isLink isDestructive
							className='flex mt-10'
						>
							{ __( 'Remove image', 'dwt-custom-theme' ) }
						</Button>
					) }

				</PanelBody>

			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ newsletterInnerClasses }
					style={{ ...bgColor, ...bColor }}
				>
					<div className='newsletter-wrapper'>

						<div className='newsletter__image-wrapper'>
							{
								( ! image && isSelected ) || ( ! image && isSelectedEmailForm ) || ( ! image && isSelectedButton )
									? <Placeholder
										title={ __( 'Icon/Logo', 'dwt-custom-theme' ) }
										text={ __( 'Select or upload an icon/logo from the side panel.', 'dwt-custom-theme' ) }
										icon='format-image'
									/>
									: outputImageTag
							}
						</div>

						<RichText
							className='heading-4 newsletter__heading'
							tagName='h4'
							placeholder={ __( 'Add an H4 heading', 'dwt-custom-theme' ) }
							allowedFormats={ [] }
							value={ heading }
							onChange={ onChangeHeading }
							style={{ ...hColor }}
						/>

						<RichText
							className='paragraph-1 newsletter__text font-400'
							tagName='p'
							placeholder={ __( 'Add text', 'dwt-custom-theme' ) }
							value={ text }
							onChange={ onChangeText }
							style={{ ...tColor }}
						/>

						{/*Block email-form*/}
						<div { ...innerBlocksProps }>
							{ children }
						</div>

						<div className='newsletter__legal-wrapper'
							style={{ ...ltColor }}>
							<RichText
								className='paragraph-3 newsletter__legal'
								tagName='p'
								placeholder={ __( 'By clicking Sign Up, I acknowledge that I have read and agree to Penguin Random House\'s Privacy Policy and Terms of Use and understand that Penguin Random House collects certain categories of personal information for the purposes listed in that policy, discloses, sells, or shares certain personal information and retains personal information in accordance with the policy. You can opt-out of the sale or sharing of personal information anytime.', 'dwt-custom-theme' ) }
								value={ legalText}
								onChange={ onChangeLegalText }
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
