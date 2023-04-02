/**
 * React dependencies
 */

import React, { useEffect, useRef } from 'react';

/**
 * DWT Dependencies
 */

import { closeButtonIcon, searchIcon } from '../.././img/icons';

/**
 * DWT components
 */

import NavOpenButton from './NavOpenButton';
import NavCloseButton from './NavCloseButton';

/**
 * Search bar component
 *
 * A component to render a search input field for the nav
 *
 * @param {Object}  props
 * @param {boolean} props.isDesktop
 * @param {boolean} props.isOpenSearch
 * @param {Object}  props.setIsOpenSearch
 * @param {string}  props.searchText
 * @param {Object}  props.setSearchText
 */
const NavSearchBar = ( { isDesktop, isOpenSearch, setIsOpenSearch, searchText, setSearchText } ) => {
	const ref = useRef( null );

	const handleSearchText = ( e ) => {
		setSearchText( e.target.value );
	};

	const handleOnClickSearchBtn = () => {
		if ( ! isOpenSearch && searchText !== '' ) {
			setSearchText( '' );
		}

		setIsOpenSearch( ! isOpenSearch );
	};

	const resetSearch = ( e ) => {
		if ( ref && ref.current && ! ref.current.contains( e.target ) ) {
			setSearchText( '' );
			setIsOpenSearch( false );
		}
	};

	const removeClassOnEnd = ( e ) => {
		if ( ! ref.current.classList.contains( 'is-active' ) ) {
			e.target.parentNode.parentNode.classList.remove( 'is-hidden-menu-items' );
		}
	};

	const applyClassOnStart = ( e ) => {
		if ( ref.current.classList.contains( 'is-active' ) ) {
			e.target.parentNode.parentNode.classList.add( 'is-hidden-menu-items' );
		}
	};

	useEffect( () => {
		document.body.classList.toggle( 'is-open-search', isOpenSearch );
		ref.current.addEventListener( 'transitionstart', applyClassOnStart );
		document.addEventListener( 'mousedown', resetSearch );

		return () => {
			ref.current.removeEventListener( 'transitionstart', applyClassOnStart );
			document.removeEventListener( 'mousedown', resetSearch );
		};
	}, [ ref, isOpenSearch ] );

	return (
		<>
			{ isOpenSearch && (
				searchIcon
			) }
			<input
				ref={ ref }
				id='site-search'
				className={ `search-input ${ isOpenSearch ? 'is-active' : '' }` }
				type='search'
				placeholder='Search book, author, series, ISBN...'
				value={ searchText }
				onChange={ ( e ) => handleSearchText( e ) }
				onTransitionEnd={ ( e ) => removeClassOnEnd( e ) }
			/>

			<NavOpenButton
				openButtonCondition={ ! isOpenSearch }
				openButtonClassNames='mr-20 md:mr-50 xl:mr-0 search-open-btn'
				openIcon={ searchIcon }
				handleOpenClose={ isDesktop ? handleOnClickSearchBtn : null }
			/>

			<NavCloseButton
				closeButtonCondition={ isOpenSearch }
				closeButtonClassNames='mr-20 md:mr-50 xl:mr-0 search-close-btn'
				closeIcon={ closeButtonIcon }
				handleOpenClose={ isDesktop ? handleOnClickSearchBtn : null }
			/>
		</>
	);
};

export default NavSearchBar;
