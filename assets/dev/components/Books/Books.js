/**
 * Books
 *
 * Component to handle the carousel, grid, and modal renderings.
 * Data is either automatic directly from the API or manually entered from the API via the editor.
 */

/**
 * React dependencies
 */

import React, { useContext, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * DWT dependencies
 */

import { formatDescription } from '../../blocks/utils/general-utils';
import { BooksContext } from './BooksContext';

/**
 * DWT hooks
 */

import useModal from '../../hooks/useModal';
import useFetchPRHData from '../../hooks/useFetchPRHData';

/**
 * DWT components
 */

import Carousel from '../Carousel';
import Grid from '../Grid';
import Modal from '../Modal';
import Loader from '../Loader';
import NoResults from '../NoResults';
import LoadMoreButton from '../LoadMoreButton';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';


const Books = () => {
	const c = useContext( BooksContext );
	const [ context, setContext ] = useState( c );	

	const carousel = context.module === 'carousel';
	const grid = context.module === 'grid';
	const automatic = context.entry === 'automatic';

	const awardWinner = context.filterBy === 'showAwards' ? true : false;
	const bestseller = context.filterBy === 'showBestsellers' ? true : false;
	const showMetadata = context.showMetadata === 'true' ? true : false;

	const modalRef = useRef( null );

	const {
		makeRequest,
		setStart,
		recordCount,
		loading,
		error,
		data,
	} = useFetchPRHData( context, '/wp-json/dwt/v2/list-title' );

	const {
		modalClass,
		modalData,
		onClickOpenModal,
		onClickCloseModal,
	} = useModal( data, modalRef, context);

	const handleCoverImage = ( item ) => {
		const autoApiImage = `https://images.randomhouse.com/cover/${ item?.isbn }`;
		const manualImage = item?.uploadedImage?.length > 0 ? item.uploadedImage : item?.apiImage;

		return automatic ? autoApiImage : manualImage;
	};

	const handleAuthors = ( item ) => automatic ? handleAutoAuthors( item ) : item?.author;

	const handleAutoAuthors = ( item ) => {
		let authors = '';
		let str;

		item?.author?.map( ( author ) => {
			if ( author?.roleCode !== 'A' ) {
				return;
			}

			authors += `${ author.authorDisplay }, `;
			str = authors.replace( /,\s*$/, '' );
		} );

		return str;
	};

	const handleFormat = ( item ) => automatic ? item.representative?.format?.description : item?.format;
	const handleDescription = ( item ) => automatic ? formatDescription( item?.flapCopy ) : item?.description;
	const handleAwardWinners = ( item ) => automatic ? awardWinner : item?.awardWinner;
	const handleBestsellers = ( item ) => automatic ? bestseller : item?.bestseller;
	const handleReadMoreURL = ( item ) => item?.workId ? `https://penguinrandomhouse.com/books/${ item.workId }` : null;

	useEffect( () => {
		const targetNode = document.querySelector( '[ data-feature-by="books" ]' );
		const config = { attributes: true, childList: false, subtree: false };

		const callback = ( mutationList, observer ) => {
			for ( const mutation of mutationList ) {
				if ( mutation.type === 'attributes' ) {
					setContext( { ...mutation.target.dataset } );
				}
			}
		};

		const observer = new MutationObserver(callback);
		observer.observe(targetNode, config);

	}, [] );

	return (
		<>
			{ context.listType === 'full-list' && (
				<>
					<Filter context={ context } recordCount={ recordCount } setStart={ setStart } error={ error } />
					<Sort context={ context } setStart={ setStart } />
				</>
			) }

			<div className='list-wrapper relative'>
			{ error && (
				<NoResults msg="Sorry, we are unable to find what you're looking for. Try adjusting your filters." />
			) }

			{ carousel && (
				<Carousel
					context={ context }				
					data={ data }
					showMetadata={ showMetadata }
					handleCoverImage={ handleCoverImage }
					handleAuthors={ handleAuthors }
					handleFormat={ handleFormat }
					error={ error }
					loading={ loading }
					onClickOpenModal={ onClickOpenModal }
				/>

			) }

			{ grid && (
				<Grid
					context={ context }
					data={ data }
					showMetadata={ showMetadata }
					handleCoverImage={ handleCoverImage }
					handleAuthors={ handleAuthors }
					handleFormat={ handleFormat }
					error={ error }
					loading={ loading }
					onClickOpenModal={ onClickOpenModal }
				/>
			) }

			{ context.listType === 'full-list' && loading && (
				<>
					<div className='overlay absolute w-full h-full top-0 bottom-0 opacity-80 bg-white'></div>
					<div className='loading-spinner'></div>					
				</>
			) }

			{ context.listType === 'full-list' && data?.length < recordCount && (
				<LoadMoreButton loadMore={ makeRequest } loading={ loading } />
			) }

			<Modal
				context={ context }			
				modalData={ modalData }
				modalClass={ modalClass }
				handleCoverImage={ handleCoverImage }
				handleAwardWinners={ handleAwardWinners }
				handleBestsellers={ handleBestsellers }
				handleAuthors={ handleAuthors }
				handleDescription={ handleDescription }
				handleReadMoreURL={ handleReadMoreURL }
				onClose={ onClickCloseModal }
				ref={ modalRef }
			/>
			</div>
		</>
	);
};

const renderBooks = () => {
	const els = document.querySelectorAll( '[data-feature-by="books"]' );
	if ( ! els ) {
		return;
	}

	for ( const el of els ) {
		const root = createRoot( el );
		root.render(
			<BooksContext.Provider value={ { ...el.dataset } }>
				<Books />
			</BooksContext.Provider>
		);
	}
};

export default renderBooks;
