/**
 * React dependencies
 */

import React, { useContext } from 'react';
import { ContributorsContext } from './ContributorsContext';

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
const Contributor = ( { item, showMetadata, handleCoverImage, handleAuthors, handleFormat, onClickOpenModal } ) => {
	const contributorsContext = useContext( ContributorsContext );
	const altText = contributorsContext.entry === 'manual' && item?.altTextManual ? item.altTextManual : handleAuthors( item );
	const authorInitials = ( item?.firstInitial ?? '' ) + ( item?.lastInitial ?? '' );

	return (
		<div className='contributor--inner'>
			<div className='image-wrapper flex aspect-[81/100] overflow-hidden relative'>
				<div className='api-image-wrapper flex w-full h-full'>
					<img
						className={ `api-image` }
						src={ handleCoverImage( item ) }
						alt={ altText }
						data-author-id={ item?.authorId }
						title={ item?.display }
						loading='lazy'
					/>
					{ ! item?.hasAuthorPhoto && (
						<span className='heading-1 m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{ authorInitials }</span>
					) }
				</div>
				<div className="overlay absolute top-0 bottom-0 left-0 right-0 opacity-0 transition-all ease-in-out duration-300"></div>
				<button className="text-12 uppercase py-17 px-11 bg-white view-details" onClick={ () => onClickOpenModal( item?.authorId ) }>+ View Details</button>
			</div>

			{ showMetadata && (
				<div className="contributor-details mt-16">
					{ item?.display && (
						<p className="contributor-details__title paragraph-1 text-16 mt-0 mb-0">{ item.display }</p>
					) }
				</div>
			) }
		</div>

	);
};

export default Contributor;
