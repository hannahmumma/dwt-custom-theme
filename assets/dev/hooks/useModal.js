import React, { useEffect, useState } from 'react';

const useModal = ( data, modalRef, context ) => {
	const [ modalData, setModalData ] = useState( [] );
	const [ modalClass, setModalClass ] = useState( 'js-closed' );
	const modalIsOpen = modalClass === 'js-opened';

	const onClickOpenModal = ( id ) => {
		setModalData( data.find( ( item ) => context.featureBy === 'books' ? item?.isbn === id : item?.authorId === id ) );
		setModalClass( 'js-opened' );
	};

	const onClickCloseModal = () => {
		setModalClass( 'js-closed' );
	};

	const onClickOffModal = ( e ) => {
		if ( modalIsOpen && modalRef.current && ! modalRef.current.contains( e.target ) ) {
			setModalClass( 'js-closed' );
		}
	};

	useEffect( () => {
		document.body.classList.toggle( 'is-open-modal', modalIsOpen );
		document.addEventListener( 'mousedown', onClickOffModal );
		return () => document.removeEventListener( 'mousedown', onClickOffModal );
	}, [ modalClass ] );

	return {
		modalData,
		modalClass,
		onClickOpenModal,
		onClickCloseModal,
	};
};

export default useModal;
