/**
 * Nav
 *
 * A component to handle the site navigation
 * We are making two requests to the WP Rest API, one for the menu data and one for custom settings.
 * @see theme.php and customizer.php to see how we're setting up the data and endpoints
 * Styles for elements with too much logic are in nav.css
 *
 * Child Components:
 * - NavCloseButton
 * - NavOpenButton
 * - NavSearchbar
 * - NavSubmenu
 */

/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * React dependencies
 */

import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * DWT Dependencies
 */

import { arrowRightIcon, closeButtonIcon, mobileMenuIcon, searchIcon } from '../.././img/icons';

/**
 * DWT hooks
 */

import useFetchBasicRequest from '../../hooks/useFetchBasicRequest';
import useMediaQuery from '../../hooks/useMediaQuery';

/**
 * DWT components
 */

import NavSubmenu from './NavSubmenu';
import NavSearchBar from './NavSearchBar';
import NavOpenButton from './NavOpenButton';
import NavCloseButton from './NavCloseButton';

const Nav = () => {
	const [ menuData, setMenuData ] = useState( [] );
	const [ settingsData, setSettingsData ] = useState( [] );

	const [ isOpenMainMenu, setIsOpenMainMenu ] = useState( false );
	const [ itemID, setItemID ] = useState( null );

	const [ isOpenSearch, setIsOpenSearch ] = useState( false );
	const [ searchText, setSearchText ] = useState( '' );

	const isDesktop = useMediaQuery( '( min-width: 1366px )' );
	const menuRef = useRef( null );

	/**
	 * Handle request
	 * use the useFetchBasicRequest hook and pass in an array of endpoints
	 */

	const {
		loading,
		error,
		data,
	} = useFetchBasicRequest( [
		'wp-json/dwt/v2/main-menu',
		'wp-json/dwt/v2/settings',
	] );

	useEffect( () => {
		if ( data.length === 0 ) {
			return;
		}

		setMenuData( data[ 0 ] );
		setSettingsData( data[ 1 ] );
	}, [ data ] );

	// console.log(data);

	/**
	 * Handle data
	 */

	let mainMenu = [];
	const allSubmenuItems = [];

	menuData?.map( ( item ) => {
		if ( item.menu_item_parent === '0' ) {
			mainMenu.push( item );
		}

		if ( item.menu_item_parent !== '0' ) {
			allSubmenuItems.push( item );
		}
	} );

	//filter out items over the 5 item max
	mainMenu = mainMenu.filter( ( item, index ) => index <= 4 ? item : null );

	/**
	 * Handle custom settings from WP customizer
	 */

	const mobileLogo = settingsData.find( ( item ) => item?.name === 'mobile_logo' ? item : null );
	const siteLogo = settingsData.find( ( item ) => item?.name === 'site_logo' ? item : null );

	/**
	 * Handle mobile main menu
	 */

	const handleMobileMenuOpenClose = () => {
		if ( searchText !== '' ) {
			setSearchText( '' );
		}

		setIsOpenMainMenu( ! isOpenMainMenu );
	};

	/**
	 * Handle submenus
	 */

	const hasSubmenuItems = ( mainMenuItem, submenu ) => submenu.find( ( submenuItem ) => parseInt( submenuItem.menu_item_parent ) === mainMenuItem.ID ) !== undefined;
	const getSubmenus = ( mainMenuItem, submenu ) => submenu.filter( ( submenuItem ) => parseInt( submenuItem.menu_item_parent ) === mainMenuItem.ID );
	const handleMobileSubmenu = ( e, item ) => setItemID( item.ID === itemID && ! e.target.classList.contains( 'submenu' ) ? null : item.ID );

	/**
	 * Handle utils for menus
	 */

	const resetMenus = () => {
		if ( ! isDesktop ) {
			setIsOpenMainMenu( false );
			setItemID( null );
		} else {
			setItemID( null );
		}
	};

	const handleClickOffMainMenu = ( e ) => {
		if ( menuRef && menuRef.current && ! menuRef.current.contains( e.target ) ) {
			resetMenus();
		}
	};

	const setMaxMenuLength = ( menu, max ) => {
		if ( menu.length <= max ) {
			return menu;
		}

		return menu.filter( ( item, index ) => index <= max - 1 ? item : null );
	};

	const getItemInReverse = ( menu, position ) => menu[ menu?.length - position ];

	useEffect( () => {
		document.body.classList.toggle( 'is-open-menu', isOpenMainMenu );
		document.addEventListener( 'mousedown', handleClickOffMainMenu );
		return () => document.removeEventListener( 'mousedown', handleClickOffMainMenu );
	}, [ isOpenMainMenu ] );

	return (
		<nav className={`site-nav flex justify-center bg-[#121212] mx-20 text-white h-[70px] md:mx-50 lg:mx-113 ${ ! isDesktop ? 'is-mobile-nav' : '' }` }>
			<div className='nav--inner w-full flex justify-between items-center'>
				<div className='site-logo-wrapper my-15 xl:mr-64'>
					<a className='site-logo__link' href='/' data-title='home'>
						{ mobileLogo && (
							<img className={ `site-logo__image mr-[4rem] w-full h-full xl:hidden` } src={ mobileLogo?.url } alt={ mobileLogo?.alt } />
						) }
						{ siteLogo && (
							<img className={ `site-logo__image mr-[4rem] w-full h-full hidden xl:block` } src={ siteLogo?.url } alt={ siteLogo?.alt } />
						) }
					</a>
				</div>

				<NavOpenButton
					openButtonCondition={ ! isDesktop && ! isOpenMainMenu }
					openButtonClassNames='text-white my-22 open-btn'
					openIcon={ mobileMenuIcon }
					handleOpenClose={ handleMobileMenuOpenClose }
				/>

				<NavCloseButton
					closeButtonCondition={ ! isDesktop && isOpenMainMenu }
					closeButtonClassNames='text-white my-22 close-btn'
					closeIcon={ closeButtonIcon }
					handleOpenClose={ handleMobileMenuOpenClose }
				/>

				<ul
					ref={ menuRef }
					className={ `main-menu ${ isDesktop ? 'is-desktop-menu' : 'is-mobile-menu' } ${ isOpenMainMenu ? 'is-active' : '' }` }
					role='menubar'
				>

					{ mainMenu?.map( ( item, index ) => (

						<li
							key={ item.ID }
							className={`menu-item ${ itemID === item.ID ? 'is-active' : '' } ${ item.url ? 'has-link' : 'has-button' } ${ hasSubmenuItems( item, allSubmenuItems ) ? 'has-dropdown' : '' }` }
							data-item-index={ index }
							aria-haspopup={ hasSubmenuItems( item, allSubmenuItems ) ? true : false }
							aria-expanded={ itemID ? true : false }
							aria-label={ item.title }
							role='menuitem'
							onClick={ ( e ) => ! isDesktop && hasSubmenuItems( item, allSubmenuItems ) ? handleMobileSubmenu( e, item ) : null }
						>

							{ ( item.url && item.url !== '#' && ! hasSubmenuItems( item, allSubmenuItems ) || ( item.url && item.url !== '#' && isDesktop ) ) && (
								<a
									className='menu-item__link w-full whitespace-nowrap no-underline'
									href={ item.url } target={ item.target ? '_blank' : null }
									rel={ item.target ? 'noopener noreferrer' : null }
									role='menuitem'
								>
									{ item.title }
								</a>
							) }

							{ ( ! item.url || item.url === '#' || ( hasSubmenuItems( item, allSubmenuItems) && ! isDesktop ) ) && (
								<button
									className={ `menu-item__button w-full text-left whitespace-nowrap no-underline` }
									role='menuitem'
								>
									{ item.title }
								</button>
							) }

							<NavSubmenu
								mainMenu={ mainMenu }
								item={ item }
								allSubmenuItems={ allSubmenuItems }
								isDesktop={ isDesktop }
								setItemID={ setItemID }
								hasSubmenuItems={ hasSubmenuItems }
								getSubmenus={ getSubmenus }
								setMaxMenuLength={ setMaxMenuLength }
								resetMenus={ resetMenus }
								getItemInReverse={ getItemInReverse }
							/>
						</li>

					) ) }

					<li className={ `menu-item menu-item--search ${ ! isDesktop ? 'is-mobile-search' : 'is-desktop-search' }` }>
						<NavSearchBar
							isDesktop={ isDesktop }
							isOpenSearch={ isOpenSearch }
							setIsOpenSearch={ setIsOpenSearch }
							searchText={ searchText }
							setSearchText={ setSearchText }
						/>
					</li>
				</ul>
			</div>
		</nav>
	);
};

const renderNav = () => {
	const header = document.querySelector( 'header' );
	if ( ! header ) return;
	
	const root = createRoot( header );
	root.render( <Nav /> );
};

export default renderNav;
