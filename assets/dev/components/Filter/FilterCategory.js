import isEmpty from 'lodash/isEmpty';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { formatStr } from '../../blocks/utils/general-utils';
import { arrowRightIcon } from '../../img/icons';

/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const FilterCategory = ( { context, setStart, categoryPost, categoryData, handleListItemClick } ) => {
	const [ categoryCode, setCategoryCode ] = useState( context?.categoryCode );
	const [ checkboxValues, setCheckboxValues ] = useState( {} );
	const categoryCodes = categoryCode?.split( ',' );

	handleCategoryFilter = ( e ) => {
		setStart( 0 );		
		setCheckboxValues( { ...checkboxValues, [e.target.value]: e.target.checked } );
	};

	useEffect( () => {
		const initial = categoryCodes?.reduce( ( a, v) => ( { ...a, [v]: true } ), {} ); 
		
		if ( isEmpty( checkboxValues ) ) {
			setCheckboxValues( initial );			
		}
	}, [] );	

	useEffect( () => {
		const returnArr = () => {
			return ! isEmpty( checkboxValues) ? Object?.entries( checkboxValues ).map( ( [ key, value ] )=> value === true ? key : null ) : [];
		}

		const arr = returnArr();
		const filter = arr.filter( ( item ) => item !== null );
		document.querySelector( '.list--inner .inner-blocks-wrapper' ).setAttribute( 'data-category-code', filter.length > 0 ? filter.toString() : '' );
		
	}, [ checkboxValues ] );

	return (
		<li className='filters__list-item py-20 border-b solid border-b-lightgray'>		
			<div className='filters__list-item--details w-full flex justify-between'>
				<h4>Category</h4>
				<span className='mr-10 rotate-90'>{ arrowRightIcon }</span>
			</div>

			<ul className='filters__submenu list-none pt-20 pl-0 flex flex-col'>				
				{ categoryData.map( ( category ) => (
					category?.status === 'publish' && ! categoryPost && (
						<li className={ `submenu__list-item ${ category.slug }` } key={ self.crypto.randomUUID() }>
							<input 
								className='submenu__input mr-10'
								id={ category.slug }
								type='checkbox'
								name={ category.slug }
								value={ category.acf?.bisac }
								onChange={ handleCategoryFilter }
								checked={ ! isEmpty( checkboxValues ) ? checkboxValues[ category.acf?.bisac ] : '' }
							/>
							<label className='submenu__input-label cursor-pointer pl-25' htmlFor={ category.slug }>
								<span  dangerouslySetInnerHTML={ { __html: category.title.rendered } } />
							</label>							
						</li>
					)
				) ) }												
			</ul>
		</li>
	);
};

export default FilterCategory;
