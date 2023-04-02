import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import { arrowRightIcon } from '../../img/icons';

/**
 * Sort
 *
 * @param {Object} props
 * @param {string} props.context
 * @param {Object} props.setStart
 */
const Sort = ( { context, setStart  } ) => {

	const sortByFeature = context.featureBy === 'books' ? 'Titles' : 'Contributors';

	const handleSort = ( e ) => {
		setStart(0);		
		const value = e.target.options[ e.target.selectedIndex ].value;
		e.target.parentNode.parentNode.setAttribute('data-sort-by', value );
		handleDirection( e );
	}

	const handleDirection = ( e ) => {
		const direction = e.target.options[ e.target.selectedIndex ].dataset.direction;
		e.target.parentNode.parentNode.setAttribute('data-direction', direction );
	}

	return (
		<div className='list-with-filters__sort'>
			<select className='p-10 border border solid' name='sort' id='sort' onChange={ ( e ) => { handleSort( e ) } }>
				<option value='authorLast' data-direction='asc' defaultValue='selected'>Sort By</option>
				<option value='onsale' data-direction='asc'>Date: Asc</option>
				<option value='onsale' data-direction='desc'>Date: Desc</option>
				<option value='random' data-direction='asc'>Random</option>				
				<option value='title' data-direction='asc'>{ `${ sortByFeature }: A-Z` }</option>
				<option value='title' data-direction='desc'>{ `${ sortByFeature }: Z-A` }</option>
			</select>
		</div>
	);
};

export default Sort;
