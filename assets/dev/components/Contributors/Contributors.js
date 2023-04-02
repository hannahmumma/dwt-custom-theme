/**
 * Contributors
 *
 * Component to handle the carousel, grid, and modal renderings.
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
import { ContributorsContext } from './ContributorsContext';

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

const Contributors = () => {
	const contributorsContext = useContext( ContributorsContext );
	const carousel = contributorsContext.module === 'carousel';
	const grid = contributorsContext.module === 'grid';
	const automatic = contributorsContext.entry === 'automatic';
	const showMetadata = contributorsContext.showMetadata === 'true' ? true : false;
	const modalRef = useRef( null );

	const {
		makeRequest,
		recordCount,
		loading,
		error,
		data,
	} = useFetchPRHData( contributorsContext, '/wp-json/dwt/v2/list-author' );

	const {
		modalClass,
		modalData,
		onClickOpenModal,
		onClickCloseModal,
	} = useModal( data, modalRef, contributorsContext );

	const handleCoverImage = ( item ) => {
		const autoApiImage = item.hasAuthorPhoto ? `https://images.randomhouse.com/author/${ item.authorId }` : `https://images.randomhouse.com/cover/${ item?.authorOf?.isbn }?blur_rad=0&blur_sig=20`;
		const manualImage = item?.uploadedImage?.length > 0 ? item.uploadedImage : item?.apiImage;

		return automatic ? autoApiImage : manualImage;
	};

	const handleAutoAuthors = ( item ) => item?.display;
	const handleAuthors = ( item ) => automatic ? handleAutoAuthors( item ) : item?.authorName;
	const handleDescription = ( item ) => automatic ? formatDescription( item?.spotlight ) : item?.spotlight;
	const handleReadMoreURL = ( item ) => item?.authorId ? `https://penguinrandomhouse.com/authors/${ item.authorId }` : null;

	return (
		<>
			{ error && (
				<NoResults />
			) }

			{ carousel && (
				<Carousel
					data={ data }
					context={ contributorsContext }
					showMetadata={ showMetadata }
					handleCoverImage={ handleCoverImage }
					handleAuthors={ handleAuthors }
					error={ error }
					loading={ loading }
					onClickOpenModal={ onClickOpenModal }
				/>
			) }

			{ grid && (
				<Grid
					data={ data }
					context={ contributorsContext }
					showMetadata={ showMetadata }
					handleCoverImage={ handleCoverImage }
					handleAuthors={ handleAuthors }
					error={ error }
					loading={ loading }
					onClickOpenModal={ onClickOpenModal }
				/>
			) }

			{ grid && contributorsContext.listType === 'full-list' && (
				<LoadMoreButton loadMore={ makeRequest } loading={ loading } />
			) }			

			<Modal
				modalData={ modalData }
				modalClass={ modalClass }
				context={ contributorsContext }
				handleCoverImage={ handleCoverImage }
				handleDescription={ handleDescription }
				handleReadMoreURL={ handleReadMoreURL }
				onClose={ onClickCloseModal }
				ref={ modalRef }
			/>
		</>
	);
};

const renderContributors = () => {
	const els = document.querySelectorAll( '[data-feature-by="contributors"]' );

	if ( ! els ) {
		return;
	}

	for ( const el of els ) {
		const root = createRoot( el );

		root.render(
			<ContributorsContext.Provider value={ { ...el.dataset } }>
				<Contributors />
			</ContributorsContext.Provider>
		);
	}
};

export default renderContributors;
