import isEmpty from 'lodash/isEmpty';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import useFetchBasicRequest from '../../hooks/useFetchBasicRequest';
import { arrowRightIcon } from '../../img/icons';

/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const FilterImprint = ( { context, setStart, imprintPost, imprintData } ) => {
	const [ imprintCode, setImprintCode ] = useState( context?.imprintCode );
	const [ checkboxValues, setCheckboxValues ] = useState( {} );
	const imprintCodes = imprintCode?.split( ',' );

	useEffect( () => {
		const initial = imprintCodes?.reduce( ( a, v ) => ( { ...a, [v]: true } ), {} ); 
		
		if ( isEmpty( checkboxValues ) ) {
			setCheckboxValues( initial );
		}
	}, [ context.imprintCode ] );

	const handleImprintCheckboxes = ( e ) => { 
		setStart( 0 );		
		setCheckboxValues( { ...checkboxValues, [e.target.value]: e.target.checked } );
	}

	useEffect( () => {
		const returnArr = () => {
			return ! isEmpty( checkboxValues ) ? Object?.entries( checkboxValues ).map( ( [ key, value ] )=> value === true ? key : null ) : [];
		}

		const arr = returnArr();
		const filter = arr.filter( ( item ) => item !== null );
	
		document.querySelector( '.list--inner .inner-blocks-wrapper' ).setAttribute( 'data-imprint-code', filter.length > 0 ? filter.toString() : '' );
		
	}, [ checkboxValues ] )

	return (
		<li className='filters__list-item py-20 border-b solid border-b-lightgray'>
		
			<div className='filters__list-item--details w-full flex justify-between'>
				<h4>Imprints</h4>
				<span className='mr-10 rotate-90'>{ arrowRightIcon }</span>
			</div>

			<ul className='filters__submenu list-none pt-20 pl-0 flex flex-col'>
				
				{ imprintData.map( ( imprint ) => {
					return ( 
						imprint?.status === 'publish' && (

							<li className={ imprintPost && imprintCode !== imprint.acf?.imprint_code ? 'opacity-30' : '' } data-imprint-title={ imprint.slug } data-post-type={ imprint.type } key={ self.crypto.randomUUID() }>
								<input 
									className='submenu__input mr-10'
									id={ imprint.slug }
									type='checkbox'
									name={ imprint.slug }
									value={ imprint.acf?.imprint_code ?? '' }
									onChange={ ! imprintPost ? handleImprintCheckboxes : null }
									checked={ ! isEmpty( checkboxValues ) ? checkboxValues[ imprint.acf?.imprint_code ] : '' }
									readOnly={ imprintPost && imprintCode === imprint.acf?.imprint_code  ? true : null }
									disabled={ imprintPost && imprintCode !== imprint.acf?.imprint_code ? true : null }
								/>
								<label className='submenu__input-label cursor-pointer pl-25' htmlFor={ imprint.slug }>
									<span  dangerouslySetInnerHTML={ { __html: imprint.title.rendered } } />
								</label>
							</li>
						)
					);
				} ) }
			</ul>
		</li>
	);
};

export default FilterImprint;
