/**
 * Front-end script for the email-form module
 */

/**
 * init
 *
 * @description initialize the script
 */
const init = () => {
	const forms = document.querySelectorAll( '.email-form__form' );

	if ( ! forms ) {
		return;
	}

	handleFormInteraction( forms );
};

/**
 * handleFormInteraction
 *
 * @description Loop through forms
 * @param {Object} forms
 */

const handleFormInteraction = ( forms ) => {
	forms.forEach( ( form ) => {
		const emailInput = form.querySelector( '.email-form__input' );
		const labelText = form.querySelector( '.email-form__label-text' );

		emailInputOnFocus( emailInput, labelText );
		emailInputOnFocusOut( emailInput, labelText );
	} );
};

/**
 * emailInputOnFocus
 *
 * @description Listen for focus to add/remove classes
 * @param {Object} input
 * @param {string} label
 */

const emailInputOnFocus = ( input, label ) => {
	input.addEventListener( 'focus', () => {
		showLabelText( label );
	} );
};

/**
 * emailInputOnFocusOut
 *
 * @description Listen for out of focus to add/remove classes
 * @param {Object} input
 * @param {string} label
 */

const emailInputOnFocusOut = ( input, label ) => {
	input.addEventListener( 'focusout', () => {
		if ( input.value === '' ) {
			hideLabelText( label );
		}
	} );
};

/**
 * showLabelText
 *
 * @description Add remove classes for styling
 * @param {string} text
 */

const showLabelText = ( span ) => {
	span.classList.remove( 'is-hidden' );
	span.classList.add( 'is-visible' );
};

/**
 * hideLabelText
 *
 * @description Add remove classes for styling
 * @param {string} text
 */

const hideLabelText = ( span ) => {
	span.classList.remove( 'is-visible' );
	span.classList.add( 'is-hidden' );
};

init();
