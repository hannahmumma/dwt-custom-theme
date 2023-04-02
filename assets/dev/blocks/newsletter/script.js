/**
 * Front-end script for the newsletter module
 *
 * @see classes/PRHNewsletterSubscription.php for how we're making our request to the PRH Messaging Web Services
 */

import {
	handleErrors,
	resetErrors,
	validateEmail,
} from '../utils/general-utils';

/**
 * init
 *
 * @description initialize the script
 */
const init = () => {
	const newsletterBlocks = document.querySelectorAll( '.block__newsletter' );

	if ( ! newsletterBlocks ) {
		return;
	}

	handleSubmit( newsletterBlocks );
};

/**
 * handleSubmit
 *
 * @description Loops through each block
 * @param {Object} blocks
 */
const handleSubmit = ( blocks ) => {
	blocks.forEach( ( block ) => {
		const form = block.querySelector( '.email-form__form' );
		submitForm( block, form );
	} );
};

/**
 * submitForm
 *
 * @description Handles form submission and errors
 * @param {Object} block
 * @param {Object} form
 */
const submitForm = ( block, form ) => {
	const submitBtn = block.querySelector( '.block__button button' );

	if ( ! submitBtn ) {
		return;
	}

	submitBtn.addEventListener( 'click', ( e ) => {
		e.preventDefault();

		const email = block.querySelector( '#email' );
		const isValid = validateEmail( email.value );
		const hasError = block.querySelector( '.has-error' );
		let msg = '';

		if ( isValid ) {
			setupFormSubmission( form )
				.then( ( data ) => {
					if ( data.Message === 'Success' ) {
						handleSuccess( form );
					} else {
						msg = 'Currently unavailable. Please try again later.';
						handleErrors( form, msg );
					}
				} );

			form.reset();

			if ( hasError ) {
				resetErrors( form );
			}
		} else {
			msg = 'Please enter a valid email.';
			handleErrors( form, msg );
		}
	} );
};

/**
 * setupFormSubmission
 *
 * @description Sets up our data to send via AJAX to the backend
 * @param {Object} form
 * @return {Object} data
 */
const setupFormSubmission = async ( form ) => {
	const formData = new FormData( form );

	formData.append( 'action', 'init_signup' );
	formData.append( 'nonce', ajax_object.nonce );
	formData.append( 'refUrl', window.location.href );

	// console.log(...formData);

	const response = await fetch( ajax_object.ajax_url, {
		method: 'POST',
		credentials: 'same-origin',
		'Content-Type': 'application/x-www-form-urlencoded',
		body: formData,
	} );

	if ( ! response.ok ) {
		throw new Error( `HTTP error! status: ${ response.status }` );
	}

	const data = await response.json();
	return data;
};

/**
 * handleSuccess
 *
 * Handles message on successful submit
 *
 * @param {Object} form
 */
const handleSuccess = ( form ) => {
	const wrapper = form.closest( '.newsletter-wrapper' );
	const children = wrapper.children;
	const heading = wrapper.querySelector( 'h4' );
	const thanks = 'Thanks for signing up!';

	if ( heading ) {
		heading.innerText = thanks;
	} else {
		const confirmationHeading = document.createElement( 'h4' );
		confirmationHeading.classList = 'heading-4 newsletter__heading';
		confirmationHeading.innerText = thanks;
		wrapper.appendChild( confirmationHeading );
	}

	showHide( children, 'is-visible', 'is-hidden' );
};

/**
 * showHide
 *
 * Adds/removes classes
 *
 * @param {Object} els
 * @param {string} str1
 * @param {string} str2
 */

const showHide = ( els, str1, str2 ) => {
	[ ...els ].forEach( ( el ) => {
		if ( el.classList.contains( 'newsletter__image-wrapper' ) ||
			el.classList.contains( 'newsletter__heading' ) ) {
			return;
		}
		el.classList.remove( str1 );
		el.classList.add( str2 );
	} );
};

init();
