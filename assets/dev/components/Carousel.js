/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * React dependencies
 */

import React, { useContext, useEffect, useRef, useState } from 'react';

/**
 * Carousel dependencies
 */

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * DWT Dependencies
 */
import { arrowLeftCarouselIcon, arrowRightCarouselIcon, arrowRightIcon } from '.././img/icons';
import { BooksContext } from './Books/BooksContext';

/**
 * DWT components
 */

import Book from './Books/Book';
import Contributor from './Contributors/Contributor';
import Loader from './Loader';

/**
 * Carousel
 *
 * A DWT reusable component
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

const Carousel = ( { data, context, showMetadata, handleCoverImage, handleAuthors, handleFormat, error, onClickOpenModal } ) => {
	const [ delay, setDelay ] = useState( true );
	const [ swiperProgress, setSwiperProgress ] = useState( 0 );
	const [ locked, setLocked ] = useState( false );
	const [ lockedClassName, setLockedClassName ] = useState( '' );
	const swiperRef = useRef();

	const ctaSlideData = context?.cta ? JSON.parse( context.cta ) : null;
	const block = context.featureBy === 'books' ? 'wp-block-dwt-book block__book' : 'wp-block-dwt-contributor block__contributor';	

	const checkLockedStatus = ( swiper ) => {
		return swiper.isLocked ? setLockedClassName( 'is-locked flex justify-center' ) : setLockedClassName( '' );
	};

	useEffect( () => {
		const handleDelay = setTimeout( () => {
			setDelay( false );
		}, 2000 );

		return () => clearInterval( handleDelay );
	}, [] );

	return (
		<>
			<Swiper
				breakpoints={ {
					480: {
						slidesPerView: 2.25,
					},
					768: {
						slidesPerView: 3.25,
					},
					1024: {
						slidesPerView: 4.25,
					},
					1600: {
						slidesPerView: 5.25,
					},
					1920: {
						slidesPerView: 6.25,
					},
					2400: {
						slidesPerView: 8.25,
					},
					3000: {
						slidesPerView: 10.25,
					},
					3560: {
						slidesPerView: 12,
					},
					3770: {
						slidesPerView: 13,
					},
				} }
				className={ lockedClassName }
				modules={ [ Navigation ] }
				onBeforeInit={ ( swiper ) => {
					swiperRef.current = swiper;
				} }
				onResize={ ( swiper ) => {
					setLocked( swiper.isLocked );
					checkLockedStatus( swiper );
				} }
				onSlideChange={ ( swiper ) => {
					setSwiperProgress( swiper.progress );
				} }
				resizeObserver={ true }
				slidesPerView={ 1.25 }
				spaceBetween={ 20 }
				watchOverflow={ true }
			>

				{ ! error && data.length > 0 && data?.map( ( item, index ) => (
					<SwiperSlide className={ `wp-block-dwt-book block__book relative ${ block }` } data-list-index={ index } key={ self.crypto.randomUUID() }>

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

					</SwiperSlide>

				) ) }

				{ ! isEmpty( ctaSlideData.text ) && (
					<SwiperSlide className="w-full h-full flex justify-center">
						<div className="cta-wrapper w-full">

							{ ctaSlideData?.href && (
								<a className="is-text-button no-underline" href={ ctaSlideData.href } target={ ctaSlideData.target ? '_blank' : null } rel={ ctaSlideData.target ? 'noopener noreferrer' : null }>{ ctaSlideData?.text }</a> 
							) }

							{ ! ctaSlideData?.href && (
								<button className="is-text-button" type="button">
									{ ctaSlideData?.text }
								</button>
							) }

							{ arrowRightIcon }
						</div>
					</SwiperSlide>
				) }
			</Swiper>
			<button className={ `swiper-button-prev ${ swiperProgress === 0 ? 'swiper-button-disabled' : '' }` } type='button' onClick={ () => swiperRef.current?.slidePrev() }>{ arrowLeftCarouselIcon }</button>
			<button className={ `swiper-button-next ${ swiperProgress === 1 || locked === true ? 'swiper-button-disabled' : '' } ${ delay ? 'swiper-button-delay' : '' }` } type='button' onClick={ () => swiperRef.current?.slideNext() }>{ arrowRightCarouselIcon }</button>
		</>
	);
};

export default Carousel;
