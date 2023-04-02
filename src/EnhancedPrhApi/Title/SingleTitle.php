<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\EnhancedPrhApi\Title;

use DWT\EnhancedPrhApi\Single\SingleDisplay;

/**
 * Single Title Class
 * PRH API Method getWorkViewProductDisplay
 */
class SingleTitle extends SingleDisplay
{   
	protected $endpoint = 'titles';
	protected $view ='views/product-display';
	protected $accepted_params = [ 'isbn' ];
	protected $param_to_match = 'isbn';
	protected $wp_rest_endpoint = '/single-title';
}
