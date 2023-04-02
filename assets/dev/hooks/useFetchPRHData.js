/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * React dependencies
 */

import React, { useState, useEffect } from 'react';

/**
 * DWT dependencies
 */

/**
 * DWT components
 */

/*
 * DWT hooks
 */

/**
 * useFetch hook
 *
 * Custom hook to handle data both fetched from the API and passed down from a data attribute that was manually entered in the editor
 *
 * @param {Object} context
 * @param {Array}  endpoint - list of paths to map through
 */
const useFetchPRHData = ( context, endpoint ) => {	
	const [ loading, setLoading ] = useState( false );
	const [ error, setError ] = useState( false );

	const [ recordCount, setRecordCount ] = useState( [] );
	const [ data, setData ] = useState( [] );
	const [ start, setStart ] = useState( 0 );

	const controller = new AbortController();
	const signal = controller.signal;

	const setupRequest = async ( rows ) => {
		const baseUrl = window.location.origin;
		const body = JSON.stringify( setupRequestParams( rows ) );

		// console.log(body);

		const response = await fetch( `${ baseUrl }${ endpoint }`, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Header': ajax_object.nonce,
			},
			body,
			signal,
		} );

		const responseData = await response.json();

		return responseData;
	};

	const setupRequestParams = ( rows ) => {
		const previousDate = calculateDate();
		const futureDate = calculateDate();		
		const workOnSaleFrom = context.filterBy === 'showNewReleases' || context.filterBy === 'showComingSoon' ? previousDate : undefined;
		const dir = context.filterBy === 'showComingSoon' ? 'asc' : 'desc';

		const dataFromEditor = {
			filterBy: context.filterBy,
			divisionCode: context.divisionCode,
			imprintCode: context.imprintCode,
			seriesCode: context.seriesCode,
			catUri: context.categoryCode,
			catSetId: context.categoryCode ? 'BI' : null,
			showCovers: context.showCovers,
			sort: context.sortBy,
			dir: context.direction ? context.direction : dir,
			rows,
			start,
			// workOnSaleFrom,
			// workOnSaleTo
		};

		return dataFromEditor;
	};

	const calculateDate = () => {
		const date = new Date();
		date.setMonth( date.getMonth() + 3 );
		const format = date.toLocaleDateString( 'en-US' );

		return format;
	};

	const makeRequest = () => {
		const rows = context.listType === 'full-list' ? 24 : 12;

		setLoading( true );	
		setupRequest( rows )
			.then( ( response ) => {
				console.log( response );
				const responseData = context.featureBy === 'books' ? response.data.works : response.data.authors;
				start === 0 ? setData( responseData ) : setData( [ ...data, ...responseData ] );
				setRecordCount( response.recordCount );

				response.code === 'no_data_found' ? setError( true ) : setError( false );
			} )	
			.catch( ( theError ) => {
				// console.error( theError );
				setError( true );
			} )
			.finally( () => {
				setLoading( false );
				setStart( ( prevStart ) => prevStart + rows)
			} );
	};

	useEffect( () => {
		if ( context.entry === 'automatic' ) {
			makeRequest();
		}

		if ( context.entry === 'manual' && context.manualData !== undefined ) {
			setData( JSON?.parse( context.manualData ) );
		}
	}, [ context ] );

	return {
		makeRequest,
		setStart,
		recordCount,
		loading,
		data,
		error,
	};
};

export default useFetchPRHData;
