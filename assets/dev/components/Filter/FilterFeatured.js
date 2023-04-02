import React, { useEffect, useState } from 'react';

import { arrowRightIcon } from '../../img/icons';

/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const FilterFeatured = ( { context, setStart } ) => {
	const [ checked, setChecked ] = useState( context.filterBy );

	const featuredByOptions = {
		'Award Winners': 'showAwards',
		'Bestsellers': 'showBestsellers',		
		'Coming Soon': 'showComingSoon',
		'New Releases': 'showNewReleases'
	};

	const handleFilter = ( e, filter ) => {
		setStart( 0 );		
		e.target.closest( '.inner-blocks-wrapper' ).setAttribute( filter, e.target.value );
		setChecked( e.target.id );
	};	

	const handleResetButton = ( e ) => {
		if ( ! checked ) return;
		e.target.closest( '.inner-blocks-wrapper' ).setAttribute( 'data-filter-by', '' );
		setStart( 0 );
		setChecked( '' );
	}

	return (		
		<li className='filters__list-item py-20 border-b solid border-b-lightgray flex flex-col'>		
			<div className='filters__list-item--details w-full flex justify-between'>
				<h4>Featured</h4>
				<span className='mr-10 rotate-90'>{ arrowRightIcon }</span>
			</div>
			<ul className='filters__submenu list-none pt-20 pl-0 flex flex-col'>
				{ Object.entries( featuredByOptions ).map( ( [ key, value ] ) => {
					return ( 
						<li className='submenu__list-item' key={ self.crypto.randomUUID() }>
							<input 
								className='submenu__input mr-10'
								id={ value }
								type='radio'
								name='featured'
								value={ value }
								onChange={ ( e ) => handleFilter( e, 'data-filter-by' ) }
								checked={ checked === value ? 'checked' : null }
							/>
							<label className='submenu__input-label cursor-pointer pl-25' htmlFor={ value }>
								<span  dangerouslySetInnerHTML={ { __html: key } } />
							</label>							
						</li> 
					);
				} ) }
			</ul>
			<button 
				className={ `btn-secondary border border-solid p-5 text-12 self-end w-max-content ${ ! checked ? 'opacity-30' : '' }` }
				type='button' 
				onClick={ handleResetButton }
				disabled={ ! checked ? true : false }>
				reset
			</button>
		</li>	
	);
};

export default FilterFeatured;
