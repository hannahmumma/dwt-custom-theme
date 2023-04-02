<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\Interfaces;

/**
 * RegisterRestRoutes Interface
 *
 */
interface RestRoutesInterface
{
	public function get_main_args( $method );
	public function get_args();
	public function get_callback();
	public function get_method( $method );
	public function get_permission_callback();
	public function get_path( $path );
}
