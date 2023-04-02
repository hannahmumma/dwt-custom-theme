/**
 * React dependencies
 */

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * DWT hooks
 */

import useFetchBasicRequest from '../hooks/useFetchBasicRequest';
import useMediaQuery from '../hooks/useMediaQuery';

/**
 * DWT components
 */

/**
 * Nav
 *
 * A component to handle the site footer
 * We are making two requests, one for the menu data and one for custom settings. 
 * @see theme.php and customizer.php to see how we're setting up the data and endpoints
 * 
 */
const Footer = () => {
    const [ menuData, setMenuData ] = useState( [] );
    const [ settingsData, setSettingsData ] = useState( [] );
    const [ itemID, setItemID ] = useState( null );

    const isDesktop = useMediaQuery( '( min-width: 1024px )' );

    /**
     * Handle request
     * use the useFetchBasicRequest hook and pass in an array of endpoints
     */

    const {
        loading,
        error,
        data,
    } = useFetchBasicRequest( [
        'wp-json/dwt/v2/footer-menu',
        'wp-json/dwt/v2/settings',
    ] );

    useEffect( () => {

        if ( data.length === 0 ) {
            return;
        }

        setMenuData( data[0] );
        setSettingsData( data[1] );

    }, [ data ] );

    //console.log(data);

    /**
     * Handle data
     */

    let footer = [];

    menuData?.map( ( item ) => {
        if ( item.menu_item_parent === '0' ) {
            footer.push( item );
        }
    } );

    //filter out items over the 8 item max
    footer =  footer.filter( ( item, index ) => index <= 7 ? item : null );

    return (
        <div className={`footer--inner w-full max-w[1366px] ${ ! isDesktop ? 'is-mobile-footer' : '' }`}>

            <ul className="footer-items">

                { footer?.map( ( item, index ) => (
                    <li
                        key={ item.ID }
                        className={`footer-item ${ itemID === item.ID ? 'is-active' : '' } ${ item.url ? 'has-link' : 'has-button' } `}
                        data-item-index={ index }
                        aria-expanded={ itemID ? true : false }
                        aria-label={ item.title }
                        role='menuitem'
                    >
                        { item.url && (
                            <a 
                                className='footer-item__link whitespace-nowrap no-underline' 
                                href={ item.url } target={ item.target ? '_blank' : null } 
                                rel={ item.target ? 'noopener noreferrer' : null }
                                role='menuitem'

                            >
                                { item.title }
                            </a>  
                        ) }
                    </li>
                ) ) }
                
            </ul>

            <div className="static-items">
                <div className="static-links">
                    <p><a className="static-link" href="https://www.penguinrandomhouse.com/terms/" target="_blank" rel="noopener noreferrer">Terms of Use</a> | <a className="static-link" href="https://www.penguinrandomhouse.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p>
                </div>

                <div className="copyright">
                    <p>© {new Date().getFullYear()} Penguin Random House</p>
                </div>
            </div>
        </div>
    );
};

const renderFooter = () => {
    const footer = document.querySelector( 'footer' );
    if ( ! footer ) return;
    
    const root = createRoot( footer );
    root.render( <Footer /> );
};

export default renderFooter;