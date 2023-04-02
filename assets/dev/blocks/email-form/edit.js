/**
 * Module: Email Form
 * Parent Block(s):
 * - Newsletter
 */

/**
 * DWT dependencies
 */

import { getParentBlockAttrs } from '../utils/block-utils';

/**
 * DWT dependencies
 */

import {
	ColorPalette,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes, context, clientId } ) => {
	const {
		labelBackgroundColor,
		newsletterAttrs,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'block__email-form',
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{ className: 'email-form__button' },
		{
			allowedBlocks: [],
			template: [ [ 'dwt/button' ] ],
			templateLock: 'all',
			renderAppender: false,
		}
	);

	const hasContext = Object.keys( context ).length > 0;

	if ( hasContext ) {
		let backgroundColor = null;
		for ( const [ key, value ] of Object.entries( context ) ) {
			backgroundColor = value ? value : '#ffffff';
			setAttributes( { labelBackgroundColor: backgroundColor } );
		}
	}

	const attrs = getParentBlockAttrs( clientId );
	setAttributes( { newsletterAttrs: attrs } );

	return (
		<div { ...blockProps }>
			<div className='email-form__form'>
				<div className='email-form__label'>
					<span
						className='email-form__label-text'
						style={{ backgroundColor: labelBackgroundColor }}
					>
						{ __( 'Email Address', 'dwt-custom-theme' ) }
					</span>
				</div>
				<div className='email-form__input'>divisions@penguinrandomhouse.com</div>

				{/*Block button*/}
				<div { ...innerBlocksProps }>
					{ children }
				</div>

			</div>
		</div>
	);
};

export default Edit;
