import React from 'react';
import { createRoot } from 'react-dom/client';

import renderNav from './components/Nav/Nav';
import renderBooks from './components/Books/Books';
import renderContributors from './components/Contributors/Contributors';
import renderSearchResults from './components/Search/SearchResults';
import renderSort from './components/Sort/Sort';
import renderFooter from './components/Footer';

const siteFeatures = () => {
	handleOverlayOnPageLoad();
}

const renderComponents = () => {
	renderNav();
	renderBooks();
	renderContributors();
	renderSearchResults();
	renderFooter();
};

const handleOverlayOnPageLoad = () => {
	const overlay = document.querySelector( '.site-overlay' );

	delay( 500 )
		.then( () => {
			overlay.classList.add( 'hidden' );
			overlay.classList.remove( 'is-visible' );
		} );
};

const delay = ( ms ) => new Promise( ( resolve ) => setTimeout( resolve, ms ) );

window.addEventListener( 'load', siteFeatures );
document.addEventListener( 'DOMContentLoaded', renderComponents );
