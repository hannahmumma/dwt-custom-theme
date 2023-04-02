/**
 * React dependencies
 */

import React, { useContext } from 'react';
import { BooksContext } from './BooksContext';

/**
 * Book
 *
 * A component to render a single book
 *
 * @param {Object}  props
 * @param {Object}  props.item
 * @param {Object}  props.handleCoverImage
 * @param {Object}  props.handleAuthors
 * @param {Object}  props.handleFormat
 * @param {Object}  props.onClickOpenModal
 * @param {boolean} props.showMetadata
 */
const Book = ( { item, showMetadata, handleCoverImage, handleAuthors, handleFormat, onClickOpenModal } ) => {
	const booksContext = useContext( BooksContext );
	const allowed = JSON.parse( booksContext?.allowedMetadataFields );
	const altText = booksContext.entry === 'manual' && item?.altTextManual ? item.altTextManual : `${ item?.title } by ${ handleAuthors( item ) }`;

	return (

		<div className="book--inner">
			<div className="image-wrapper bg-light-gray aspect-[81/100] relative">
				<div className="api-image-wrapper w-full">
					<img
						className="api-image shadow-book-img w-[60%]"
						src={ handleCoverImage( item ) }
						alt={ altText }
						data-format={ handleFormat( item ) }
						data-isbn={ item?.isbn }
						data-workid={ item?.workId }
						title={ item?.title }
						loading='lazy'
					/>
				</div>
				<div className="overlay absolute top-0 bottom-0 left-0 right-0 bg-gray opacity-0 transition-all ease-in-out duration-300"></div>
				<button className="text-12 uppercase py-17 px-11 bg-white view-details" onClick={ () => onClickOpenModal( item?.isbn ) }>+ View Details</button>
			</div>

			{ showMetadata && (
				<div className="book-details mt-16">
					{ item?.title && allowed.includes( 'Title' ) && (
						<p className="book-details__title paragraph-1 text-16 mt-0 mb-0">{ item.title }</p>
					) }

					{ handleAuthors( item ) && allowed.includes( 'Contributor Name' ) && (
						<p className="book-details__author paragraph-2 text-[0.9rem] mt-[0.1rem] mb-0">{ handleAuthors( item ) }</p>
					) }

					{ handleFormat( item ) && allowed.includes( 'Format' ) && (
						<p className="book-details__format paragraph-2 text-[0.9rem] mt-[0.1rem] mb-0 text-[#606060]">{ handleFormat( item ) }</p>
					) }
				</div>
			) }
		
		</div>
	);
};

export default Book;
