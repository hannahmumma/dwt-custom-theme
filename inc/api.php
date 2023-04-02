<?php

/**
 * Instantiate title objects
 */

function init_api_requests() 
{
	new DWT\EnhancedPrhApi\Title\SingleTitle();
	new DWT\EnhancedPrhApi\Title\ListTitle();
	new DWT\EnhancedPrhApi\Author\SingleAuthor();
	new DWT\EnhancedPrhApi\Author\ListAuthor();
}

add_action( 'init', 'init_api_requests' );

function init_newsletter()
{
	new DWT\PRHNewsletterSubscription();
}

add_action( 'after_setup_theme', 'init_newsletter' );
