/**
 * React dependencies
 */

import React, { useEffect, useRef } from 'react';

/**
 * DWT Dependencies
 */

import { arrowRightIcon } from '../.././img/icons';

/**
 * DWT components
 */

/**
 * Search bar component
 *
 * A component to render a search input field for the nav
 *
 * @param {Object}  props
 * @param {Object}  props.item
 * @param {Array}   props.allSubmenuItems
 * @param {boolean} props.isDesktop
 * @param {Object}  props.setItemID
 * @param {Object}  props.hasSubmenuItems
 * @param {Object}  props.getSubmenus
 * @param {Object}  props.setMaxMenuLength
 * @param {Object}  props.resetMenus
 * @param {Object}  props.mainMenu
 * @param {Object}  props.getItemInReverse
 */
const NavSubmenu = ( {
	mainMenu,
	item,
	allSubmenuItems,
	isDesktop,
	setItemID,
	hasSubmenuItems,
	getSubmenus,
	setMaxMenuLength,
	resetMenus,
	getItemInReverse,
} ) => {
	const submenuItemMax = 28;
	const submenuItemColumnMax = 7;

	const secondToLastSubmenItemPositionMax = 14;
	const lastSubmenuItemPositionMax = 7;

	const last = getItemInReverse( mainMenu, 1 );
	const secondToLast = getItemInReverse( mainMenu, 2 );

	const handleSubmenuPosition = () => {
		if ( ! isDesktop ) {
			return;
		}

		let moveRight = '';

		if ( ( secondToLast?.ID === item.ID && getSubmenus( item, allSubmenuItems ).length > secondToLastSubmenItemPositionMax ) ||
			( last?.ID === item.ID && getSubmenus( item, allSubmenuItems ).length > lastSubmenuItemPositionMax ) ) {
			moveRight = 'move-right';
		}

		return moveRight;
	};

	const handleSubmenuOnBackBtn = () => setItemID( null );

	return (
		hasSubmenuItems( item, allSubmenuItems ) && (
			<>
				{ arrowRightIcon }

				<ul
					className={ `submenu ${ getSubmenus( item, allSubmenuItems ).length > submenuItemColumnMax ? 'is-over-column-limit' : '' } ${ handleSubmenuPosition() }` }
					role='menu'
				>
					{ ! isDesktop && (
						<li className='submenu-item pt-0 pb-25 flex border-b border-gray flex gap-20' aria-label={ item.title } role='menuitem'>
							<button className='back-button' onClick={ handleSubmenuOnBackBtn } role='menuitem'>
								{ arrowRightIcon}
							</button>

							{ ( item.url && item.url !== '#' ) && (
								<a
									className='menu-item__link w-full whitespace-nowrap no-underline hover:underline'
									href={ item.url }
									target={ item.target ? '_blank' : null }
									rel={ item.target ? 'noopener noreferrer' : null }
									role='menuitem'
									onClick={ resetMenus }
								>
									{ item.title }
								</a>								
							) }

							{ ( ! item.url || item.url === '#' ) && (
								<button
									className={ `menu-item__button flex w-full whitespace-nowrap no-underline` }
									role='menuitem'
									onClick={ resetMenus }
								>
									{ item.title }
								</button>
							) }
						</li>
					) }

					{ setMaxMenuLength( getSubmenus( item, allSubmenuItems ), submenuItemMax )?.map( ( submenuItem, i ) => (

						parseInt( submenuItem.menu_item_parent ) === item.ID && (
							<li className='submenu-item flex'
								key={ submenuItem.ID }
								data-item-index={ i }
								role='menuitem'
								onClick={ resetMenus }
							>
								<a
									className='submenu-item__link w-full whitespace-nowrap no-underline hover:underline'
									href={ submenuItem.url }
									target={ submenuItem.target !== '' ? '_blank' : null }
									data-title={ submenuItem.title }
								>
									{ submenuItem.title }
								</a>
							</li>
						)

					) ) }
				</ul>
			</>
		)
	);
};

export default NavSubmenu;
