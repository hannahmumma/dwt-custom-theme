<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\EnhancedPrhApi\Author;

use DWT\EnhancedPrhApi\Single\SingleDisplay;

/**
 * Single Author Class
 * PRH API Method - getViewAuthorDisplay
 */
class SingleAuthor extends SingleDisplay
{
	protected $endpoint = 'authors';
	protected $view ='views/author-display';
	protected $accepted_params = [ 'authorId' ];
	protected $param_to_match = 'authorId';
	protected $wp_rest_endpoint = '/single-author';
}
