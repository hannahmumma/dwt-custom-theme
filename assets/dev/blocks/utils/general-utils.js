/**
 * handleErrors
 *
 * Error handling
 *
 * @param {Object} el
 * @param {string} str
 */
const handleErrors = ( el, str ) => {
	const errorMessage = el.querySelector( '.error-message' );
	errorMessage.innerText = str;

	el.classList.add( 'has-error' );
	el.querySelector( '.error-message' ).classList.remove( 'is-hidden' );
	el.querySelector( '.error-message' ).classList.add( 'is-visible' );
};

/**
 * resetErrors
 *
 * Resets error handling
 *
 * @param {Object} el
 */
const resetErrors = ( el ) => {
	el.classList.remove( 'has-error' );
	el.querySelector( '.error-message' ).classList.add( 'is-hidden' );
	el.querySelector( '.error-message' ).classList.remove( 'is-visible' );
};

/**
 * delay
 *
 * sets a timer
 *
 * @param {number} ms
 * @return {Object} promise
 */

const delay = ( ms ) => {
	return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
};

/**
 * getQueryString
 *
 * Checks for URL params and returns the one we need when we call it
 *
 * @param {string} param
 * @param {string} link
 * @return {string} item
 */
const getParam = ( param, link ) => {
	const searchParams = new URLSearchParams( link );

	if ( ! searchParams.has( param ) ) {
		return;
	}

	let item;

	searchParams.forEach( ( value, key ) => {
		if ( key === param ) {
			item = value;
		}
	} );

	return item;
};

/**
 * getQueryString
 *
 * Returns a query string
 *
 * @param {string} str
 * @return {string} str
 */
const getQueryString = ( str ) => {
	return str.substring( str.indexOf( '?' ) + 1 );
};

/**
 * validateEmail
 *
 * Validates email address against a Regular Expression
 *
 * @param {string} str
 * @return {boolean} true/false
 * @see https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
 */
const validateEmail = ( str ) => {
	const regex = new RegExp( "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])" );
	return regex.test( str );
};

const formatDescription = ( html ) => {
	if ( ! html ) {
		return;
	}

	const removeHTML = html.replace( /<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '' );

	const truncate = removeHTML.substring( 0, 576 );
	truncate.substr( 0, Math.min( truncate.length, truncate.lastIndexOf( ' ' ) ) );

	const textarea = document.createElement( 'textarea' );
	textarea.innerHTML = truncate;

	return textarea.value;
};

/**
 * filterOutWhiteSpace
 *
 * Handles error messaging if any required attrs are missing
 *
 * @param {Array} classNames
 */
const filterOutWhiteSpace = ( classNames ) => classNames.filter( Boolean ).join( ' ' );

/**
 * capitalizeFirstLetter
 *
 * @param {str} words/sentences that need to be capitalized
 * @return { str }
 */
const capitalizeFirstLetter = ( str ) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * formatStr
 *
 * @param {str} strip out special characters and number and replace with hyphen
 * @return { str }
 */
const formatStr = ( str ) =>  str.toLowerCase().replace( /[^A-Z]+/ig, '-' );

/**
 * sortAlphabetically
 *
 * @param {Array } Array of objects that need to be rendered alphabetically
 * @return { Array }
 */
const sortAlphabetically = ( data ) => {
    return data.sort( ( a, b ) => {
        if ( a.title?.rendered < b.title?.rendered ) {
            return -1;
        }
        
        if ( a.title?.rendered > b.title?.rendered ) {
            return 1;
        }
        
        return 0;
    } );
};

export {
	handleErrors,
	resetErrors,
	delay,
	getParam,
	getQueryString,
	validateEmail,
	formatDescription,
	filterOutWhiteSpace,
	capitalizeFirstLetter,
    formatStr,
    sortAlphabetically,
};
