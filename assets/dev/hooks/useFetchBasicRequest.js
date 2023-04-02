/**
 * React dependencies
 */

import React, { useState, useEffect } from 'react';

/**
 * useFetchBasicRequest hook
 *
 * Custom hook to handle data from an array of endpoints. Mostly for use with WP Rest API and ACF.
 *
 * @param {Array} endpoints
 */
const useFetchBasicRequest = ( endpoints ) => {
	const [ loading, setLoading ] = useState( false );
	const [ error, setError ] = useState( false );
	const [ data, setData ] = useState( [] );

	const controller = new AbortController();
	const signal = controller.signal;

	const makeRequest = () => {
		setLoading( true );

		setupRequest()
			.then( ( responses ) => {
				return Promise.all( responses.map( ( response ) => {
					return response.json();
				} ) );
			} )
			.then( ( data ) => {
				// console.log( data);

				setData( data );
				setLoading( false );
			} )
			.catch( ( theError ) => {
				// console.error( theError );
				setError( true );
			} );
	};

	const setupRequest = async () => {
		const baseUrl = window.location.origin;
		const args = {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Header': ajax_object.nonce,
			},
			signal,
		};

		const responses = await Promise.all( endpoints.map( ( path ) => fetch( `${ baseUrl }/${ path }` ), args ) );

		const ok = [];

		responses.map( ( response ) => {
			ok.push( response.ok );
		} );

		if ( ok.includes( false ) ) {
			setError( true );
		}

		const responseData = await responses;

		return responseData;
	};

	useEffect( () => {
		makeRequest();
		return () => controller.abort();
	}, [] );

	return {
		loading,
		error,
		data,
	};
};

export default useFetchBasicRequest;
