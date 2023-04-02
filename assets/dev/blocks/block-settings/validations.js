/**
 * Validations script
 * - Validate required attributes set in block.json of each block
 * - Validate the alt text field in the media library
 */

import { getDWTBlocks } from '../utils/global-utils';

const { dispatch, subscribe } = wp.data;

/**
 * init
 *
 * Run it
 */
const init = () => {
	subscribe( _.debounce( handlePostLocking ) );
	subscribe( _.debounce( validateAltText ) );	
};

/**
 * handlePostLocking
 *
 * Lock/unlock post saving if a required attribute is missing.
 */

const handlePostLocking = () => {
	const updatedDWTBlocks = getDWTBlocks();
	const valid = checkForInvalidFields( updatedDWTBlocks );

	if ( valid === false ) {
		dispatch( 'core/editor' ).lockPostSaving( 'dwt-lock' );
	} else {
		dispatch( 'core/editor' ).unlockPostSaving( 'dwt-lock' );
	}
};

/**
 * checkForInvalidFields
 * Check if the array from getRequiredFields has any empty values
 * If so, return false
 *
 * @param {Array} blocks
 * @retrun {boolean} array of values of the required fields if any
 */
const checkForInvalidFields = ( blocks ) => {
	const requiredFields = setupFieldsToBeValidated( blocks );
	let isValid = true;

	if ( requiredFields.includes( '' ) ) {
		isValid = false;
	}

	return isValid;
};

/**
 * getRequiredFields
 * Match up required field attributes array with other attributes
 * Check if any of those attributes that are required is empty
 *
 * @param {Array} blocks
 * @return {Array} array of values of the required fields if any
 */
const setupFieldsToBeValidated = ( blocks ) => {
	const arr = [];

	blocks?.map( ( block ) => {
		for ( const [ key, value ] of Object?.entries( block.attributes ) ) {
			block.attributes?.requiredAttrs?.map( ( field ) => {
				if ( field === key ) {
					arr.push( value );
				}
			} );
		}
	} );

	return arr;
};

/**
 * validateAltText
 *
 * Disables/enables media library select button if the alt text field is empty
 * Also removes text about leaving the alt text field empty for decortaive images
 */
const validateAltText = () => {
	const altTextField = document.getElementById( 'attachment-details-alt-text' );
	const altTextDescription = document.getElementById( 'alt-text-description' );
	const selectButton = document.querySelector( '.media-button' );

	createAltTextRequired( altTextField, altTextDescription );

	altTextDescription?.firstElementChild?.nextSibling?.remove();

	if ( altTextField?.value === '' ) {
		selectButton?.setAttribute( 'disabled', 'disabled' );
	} else {
		selectButton?.removeAttribute( 'disabled' );
	}
};

const createAltTextRequired = ( field, description ) => {
	const details = document.querySelector( '.attachment-details' );
	const p = document.createElement( 'p' );

	p.innerText = 'Alt text is required.';
	p.className = 'required';
	p.style.clear = 'both';
	p.style.width = '65%';
	p.style.float = 'right';
	p.style.fontSize = '12px';
	p.style.marginBottom = '10px';

	const all = document.querySelectorAll( '.required' );

	if ( field && all.length === 0 ) {
		details?.insertBefore( p, description?.nextSibling );
	}
};

export { init };
