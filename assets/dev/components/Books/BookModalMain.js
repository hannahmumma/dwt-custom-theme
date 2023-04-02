/**
 * External dependencies
 */

import React, { useContext } from 'react';

/**
 * DWT dependencies
 */

import { closeButtonIcon } from '../../img/icons';

/**
 * BookModalMain
 *
 * Book main content for modal
 *
 * @param {Object} props
 * @param {Object} props.context
 * @param {Object} props.modalData
 * @param {Object} props.handleCoverImage
 * @param {Object} props.handleAwardWinners
 * @param {Object} props.handleBestsellers
 * @param {Object} props.handleAuthors
 * @param {Object} props.handleDescription
 * @param {Object} props.handleReadMoreURL
 */
const BookModalMain = ( { context, modalData, handleCoverImage, handleAwardWinners, handleBestsellers, handleAuthors, handleDescription, handleReadMoreURL } ) => {
	const allowed = context?.featureBy === 'books' ?  JSON.parse( context.allowedMetadataFields ) : null;
	const hasTags = handleAwardWinners( modalData ) || handleBestsellers( modalData ) ? true : false;

	return (
		<>
			<div className="modal__main flex flex-col mb-40 md:mb-0 grow">
				<div className="modal__details-view bg-white flex flex-col md:flex-row md:gap-20 relative">

					<div className="modal__cover mt-30 md:mt-0 mb-24 md:mb-0 md:h-[100%] md:basis-2/5">
						<div className="image-wrapper bg-light-gray flex justify-center items-center aspect-[81/100]">
							<img
								className="api-image shadow-book-img w-[60%]"
								src={ handleCoverImage( modalData ) }
								alt={ `${ modalData?.title } by ${ handleAuthors( modalData ) }` }
								data-isbn={ modalData?.isbn ? modalData.isbn : null }
								data-workid={ modalData?.workId ?? null }
								title={ modalData?.title ?? null }
								loading='lazy'
							/>
						</div>
					</div>

					<div className="modal__details md:flex md:flex-col md:basis-3/5">
						{ hasTags && (
							<div className="modal__book-tags mb-10 md:mb-24 absolute top-0 md:relative">
								{ handleAwardWinners( modalData ) && (
									<span className="award-winner paragraph-3 rounded border border-solid border-gray py-0 px-10 mr-10">Award Winner</span>
								) }

								{ handleBestsellers( modalData ) && (
									<span className="bestseller paragraph-3 rounded border border-solid border-gray py-0 px-10">Bestseller</span>
								) }
							</div>
						) }

						{ modalData?.title && allowed.includes( 'Title' ) && (
							<h3 className="modal__heading heading-3 text-26 mb-10 mt-0">{ modalData.title }</h3>
						) }

						{ handleAuthors( modalData ) && allowed.includes( 'Contributor Name' ) && (
							<p className="modal__book-author paragraph-3 mt-0 mb-20">By <span className="font-500 uppercase">{ handleAuthors( modalData ) }</span></p>
						) }

						{ handleDescription( modalData ) && (
							<p className="modal__description paragraph-3 font-200">{ handleDescription( modalData ) }... <a className="font-500" href={ handleReadMoreURL( modalData ) } target="_blank" rel="noopener">Read more &#62;</a></p>
						) }
					</div>
				</div>
			</div>
		</>
	);
};

export default BookModalMain;
