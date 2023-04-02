/**
 * External dependencies
 */

/**
 * React dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { useContext, useState, useEffect } from 'react';

/**
 * DWT dependencies
 */

import { BooksContext } from './Books/BooksContext';

/**
 * DWT components
 */

import Book from './Books/Book';
import Contributor from './Contributors/Contributor';
import Loader from './Loader';
import LoadMoreButton from './LoadMoreButton';

/**
 * Book Component
 * Parent container for book list
 *
 * @param {Object}  props
 * @param {Array}   props.data
 * @param {Object}  props.context
 * @param {boolean} props.showMetadata
 * @param {Object}  props.handleCoverImage
 * @param {Object}  props.handleAuthors
 * @param {Object}  props.handleFormat
 * @param {boolean} props.error
 * @param {Object}  props.onClickOpenModal
 */
const Grid = ( { data, context, showMetadata, error, handleCoverImage, handleAuthors, handleFormat, onClickOpenModal } ) => {
	const [ delay, setDelay ] = useState( true );
	const blockClasses = context.featureBy === 'books' ? 'wp-block-dwt-book block__book' : 'wp-block-dwt-contributor block__contributor';

	useEffect( () => {
		const handleDelay = setTimeout( () => {
			setDelay( false );
		}, 2000 );

		return () => {
			clearInterval( handleDelay );
		};
	}, [] );

	return (
		! error && data?.length > 0 && data?.map( ( item, index ) => (
			<div className={ blockClasses } data-list-index={ index } key={ self.crypto.randomUUID() }>

				{ delay && (
					<Loader showMetadata={ showMetadata } />
				) }

				{ ! delay && context.featureBy === 'books' && (
					<Book
						item={ item }
						showMetadata={ showMetadata }
						handleCoverImage={ handleCoverImage }
						handleAuthors={ handleAuthors }
						handleFormat={ handleFormat }
						onClickOpenModal={ onClickOpenModal }
					/>
				) }

				{ ! delay && context.featureBy === 'contributors' && (
					<Contributor
						item={ item }
						showMetadata={ showMetadata }
						handleCoverImage={ handleCoverImage }
						handleAuthors={ handleAuthors }
						onClickOpenModal={ onClickOpenModal }
					/>
				) }
			</div>
		) )		
	);
};

export default Grid;
