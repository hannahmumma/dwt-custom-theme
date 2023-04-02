/**
 * DWT dependencies
 */

import { processNewsletterAttrs } from './save-extra';

/**
 * WP dependencies
 */

import { RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const save = ( { attributes } ) => {
	const {
		labelBackgroundColor,
		newsletterAttrs,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'block__email-form',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'email-form__button',
	} );

	let inputFields = null;

	if ( newsletterAttrs !== null ) {
		inputFields = processNewsletterAttrs( newsletterAttrs );
	}

	return (
		<div { ...blockProps }>
			<form className='email-form__form'>
				<label className='email-form__label flex' for='email' >
					<span
						className='email-form__label-text is-hidden'
						style={{ backgroundColor: labelBackgroundColor }}
					>
						{ __( 'Email Address', 'dwt-custom-theme' ) }
					</span>
				</label>
				<RichText.Content
					className='email-form__input w-full bg-transparent'
					tagName='input'
					id='email'
					type='email'
					name='email'
					placeholder={ __( 'Email Address', 'dwt-custom-theme' ) }
				/>
				<p className='paragraph-3 error-message text-error-red is-hidden'></p>

				{/*Block button*/}
				<div { ...innerBlocksProps } />

				{ newsletterAttrs ? inputFields : null }

			</form>
		</div>
	);
};

export default save;
