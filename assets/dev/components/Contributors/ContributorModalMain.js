/**
 * External dependencies
 */

import React, { useContext } from 'react';

/**
 * DWT dependencies
 */

/**
 * ContributorModalMain
 *
 * Contributor main content for modal
 *
 * @param {Object}  props
 * @param {Object}  props.context
 * @param {Object}  props.modalData
 * @param {Object}  props.handleCoverImage
 * @param {Object}  props.handleDescription
 * @param {Object}  props.handleReadMoreURL
 */
const ContributorModalMain =  ( { context, modalData, handleCoverImage, handleDescription, handleReadMoreURL } ) => {
	const authorInitials = ( modalData?.firstInitial ?? '' ) + ( modalData?.lastInitial ?? '' );
	return (
		<div className='modal__main flex flex-col mb-40 md:mb-0 grow'>
			<div className='modal__details-view bg-white flex flex-col md:flex-row md:gap-30 relative'>

				<div className='modal__cover mt-30 md:mt-0 mb-24 md:mb-0 md:h-[100%] md:basis-2/5'>
					<div className='image-wrapper flex flex-col relative'>
						<img
							className={ 'api-image' }
							src={ handleCoverImage( modalData ) }
							alt={ modalData?.display ? modalData.display : null }
							data-author-id={ modalData?.authorId ?? null }
							title={ modalData?.display ?? null }
							loading='lazy'
						/>
						{ modalData?.photocredit && (
							<p className='text-10 mt-5'>Photo: &copy;{ modalData.photocredit }</p>
						) }
						{ ! modalData?.hasAuthorPhoto && (
							<span className='heading-1 m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{ authorInitials }</span>
						) }
					</div>
				</div>

				<div className='modal__details md:flex md:flex-col md:basis-3/5 justify-center'>

					{ modalData?.display && (
						<h3 className="modal__heading heading-3 mb-10 mt-0">{ modalData.display }</h3>
					) }

					{ handleDescription( modalData ) && (
						<p className="modal__description paragraph-3 font-200">{ handleDescription( modalData ) }... <a className="font-500" href={ handleReadMoreURL( modalData ) } target="_blank" rel="noopener">Read more &#62;</a></p>
					) }
				</div>
			</div>
		</div>
	);
};

export default ContributorModalMain;
