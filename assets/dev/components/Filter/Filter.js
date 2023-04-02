import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import useFetchBasicRequest from '../../hooks/useFetchBasicRequest';

import { arrowRightIcon } from '../../img/icons';
import Breadcrumbs from '../Breadcrumbs';
import FilterHeading from './FilterHeading';
import FilterNav from './FilterNav';
import FilterList from './FilterList';

/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const Filter = ( { context, recordCount, setStart, error, makeRequest } ) => {
	const [ isOpen, setIsOpen ] = useState( false );	
	const [ categoryPost, setCategoryPost ] = useState( window.location.href.indexOf( 'book-category' ) !== -1 );
	const [ imprintPost, setImprintPost ] = useState( window.location.href.indexOf( 'imprint' ) !== -1 );
	const [ slug, setSlug ] = useState( '' );

	const [ categoryData, setCategoryData ] = useState( [] );
	const [ imprintData, setImprintData ] = useState( [] );

	/**
	 * Handle requests
	 * use the useFetchBasicRequest hook and pass in an array of endpoints
	 */
	const {
		loading,
		// error,
		data,
	} = useFetchBasicRequest( [
		'wp-json/wp/v2/bookcategory',
		'wp-json/wp/v2/imprint',
	] );

	useEffect( () => {
		if ( data.length === 0 ) {
			return;
		}

		setCategoryData( data[ 0 ] );
		setImprintData( data[ 1 ] );
	}, [ data ] );

	const getSlug = ( url ) => {
	 	const parts = url.split('/');
	 	return parts.at( - 2 );
	}
	
	const postSlug = getSlug( window.location.href );

	useEffect( () => {
		setSlug( postSlug );
	}, [] );



	return (
		<>
			<Breadcrumbs context={ context } slug={ slug } />
        	<div className='list-with-filters__heading'>
				<FilterHeading context={ context } recordCount={ recordCount } error={ error } />
			</div>
			
			<div className='list-with-filters__filters'>

					{ ! imprintPost && ! categoryPost && (
						<FilterNav categoryData={ categoryData } imprintData={ imprintData } />
					) }


					<FilterList 
						context={ context }
						categoryPost={ categoryPost }
						categoryData={ categoryData }
						imprintPost={ imprintPost }
						imprintData={ imprintData }
						setStart={ setStart }
					/>
			</div>
		</>
	);
};

export default Filter;
