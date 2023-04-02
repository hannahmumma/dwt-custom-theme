import React from 'react';

const SearchResults = () => {
	return (
		<div className='search'>
			<h2 className="heading-2">Search Results</h2>
		</div>
	);
};

const renderSearchResults = () => {
	const searchResults = document.querySelector( '.page-search-results main' );

	if ( ! searchResults ) {
		return;
	}

	const root = createRoot( searchResults );

	root.render( <SearchResults /> );
};

export default renderSearchResults;

