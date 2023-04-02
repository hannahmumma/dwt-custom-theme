<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\EnhancedPrhApi\Title;

use DWT\EnhancedPrhApi\List\ListDisplay;

/**
 * TitleListing Class
 * PRH API Method getWorkViewListDisplay
 */
class ListTitle extends ListDisplay
{   	
	protected $endpoint = 'works';	
	protected $wp_rest_endpoint = '/list-title';
}
