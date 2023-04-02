<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\Interfaces;

/**
 * RequestsInterface Interface
 *
 */
interface RequestsInterface
{
	public function make_request( $request );
	public function setup_request( $request );
	public function setup_params( $request );
}
