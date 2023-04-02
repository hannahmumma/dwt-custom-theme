/**
 * External dependencies
 */

import React, { useContext } from 'react';

/**
 * DWT dependencies
 */

import BookModalMain from './Books/BookModalMain';
import ContributorModalMain from './Contributors/ContributorModalMain';
import { closeButtonIcon } from '../img/icons';

/**
 * DWTPlaceholder
 *
 * A DWT reusable component
 *
 * @param {Object}  props
 * @param {string}  props.context
 * @param {string}  props.modalClass
 * @param {Object}  props.modalData
 * @param {string}  props.handleCoverImage
 * @param {boolean} props.handleAwardWinners
 * @param {boolean} props.handleBestsellers
 * @param {string}  props.handleAuthors
 * @param {string}  props.handleDescription
 * @param {string}  props.handleReadMoreURL
 * @param {Object}  props.onClose
 */
const Modal = React.forwardRef( ( {
	context,
	modalClass,
	modalData,
	handleCoverImage,
	handleAwardWinners,
	handleBestsellers,
	handleAuthors,
	handleDescription,
	handleReadMoreURL,
	onClose,
}, modalRef ) => {
	return (
		<div
			className={ `modal shadow-modal flex flex-col bg-white p-20 pb-0 w-full h-full top-0 overflow-y-scroll overflow-x-hidden max-w-[760px] fixed z-[52] md:h-auto md:top-[142px] md:pt-20 md:px-30 md:pb-90 md:w-[90%] md:overflow-y-hidden ${ modalClass }` }
			data-modal={ context.featureBy === 'books' ? 'books' : 'contributors' }
			role='dialog'
			aria-labelledby='modal__feature-by'
			aria-modal='true'
			ref={ modalRef }
		>

			<div className="modal__header self-end">
				<button type="button" className="cursor-pointer js-close-btn" onClick={ onClose }>{ closeButtonIcon }</button>
			</div>

			{ context.featureBy === 'books' && (
				<BookModalMain
					modalData={ modalData }
					context={ context }
					handleCoverImage={ handleCoverImage }
					handleAwardWinners={ handleAwardWinners }
					handleBestsellers={ handleBestsellers }
					handleAuthors={ handleAuthors }
					handleDescription={ handleDescription }
					handleReadMoreURL={ handleReadMoreURL }
					onClose={ onClose }
				/>
			) }

			{ context.featureBy === 'contributors' && (
				<ContributorModalMain
					modalData={ modalData }
					modalClass={ modalClass }
					context={ context }
					handleCoverImage={ handleCoverImage }
					handleDescription={ handleDescription }
					handleReadMoreURL={ handleReadMoreURL }
					onClose={ onClose }
				/>
			) }

			<div className="modal__footer flex justify-center bg-black -ml-20 -mr-20 w-auto md:w-full md:ml-0 md:mr-0 md:absolute md:bottom-0 md:left-0 hover:bg-[#505050] hover:transition-all hover:ease-in-out hover:duration-300">
				{ handleReadMoreURL( modalData ) && (
					<a className="modal__footer-link paragraph-3 w-full h-full flex justify-center py-16 font-500 m-0" href={ handleReadMoreURL( modalData ) } target="_blank" rel="noopener">View Full Details &#10141;</a>
				) }
			</div>

		</div>
	);
} );

export default Modal;
