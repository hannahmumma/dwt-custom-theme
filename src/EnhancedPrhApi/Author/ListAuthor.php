<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\EnhancedPrhApi\Author;

use DWT\EnhancedPrhApi\List\ListDisplay;

/**
 * Author Listing Class
 * PRH API Method - getViewAuthorListDisplay
 */
class ListAuthor extends ListDisplay
{   
	protected $endpoint = 'authors';
	protected $wp_rest_endpoint = '/list-author';	
}
