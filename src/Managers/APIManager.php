<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\Managers;

use DWT\Interfaces\RestRoutesInterface;
use DWT\Interfaces\RequestsInterface;

/**
 * API Manager Class
 * Handles routes registration and making requests
 */
abstract class APIManager implements RestRoutesInterface, RequestsInterface
{
    /** 
     * @var string $base - base url
     */
	protected $base;

    /** 
     * @var string $endpoint - endpoint to post
     */
	protected $endpoint;

    /** 
     * @var array $accepted_params - params to verify from front end
     */
	protected $accepted_params = [];

    /** 
     * @var string $wp_rest_endpoint - wp rest api endpoint
     */
	protected $wp_rest_endpoint;

    /** 
     * @var array $httpHeader
     */
	protected $httpHeader = [];

    /** 
     * constructor
     * @return void
     */
	public function __construct()
	{
		add_action( 'rest_api_init', [ $this, 'register_route' ] );
	}

    /** 
     * Register rest route
     * @param string $namespace
     * @param string $path
     * @param object $method
     * @return void
     */
	public function register_route( $namespace, $path, $method ) : void
	{
		register_rest_route(
			$namespace,
			$this->get_path( $path ),
			$this->get_main_args( $method )
		);
	}    

    /** 
     * Get args for WP
     * @param object $method - Request method
     * @return array
     */
	public function get_main_args( $method ) : array
	{
		return [
			'args' => $this->get_args(),
			'callback' => $this->get_callback(),
			'methods' => $this->get_method( $method ),
			'permission_callback' => '__return_true'
		];
	}

    /** 
     * Get args from source
     * @return array
     */
	public function get_args() : array
	{
		$params = $this->accepted_params;
		$array = [];

		foreach( $params as $param ) {
			$array[ $param ] = [ 
				'sanitize_callback' => 'rest_sanitize_request_arg',
				'validate_callback' => 'rest_validate_request_arg'
			];
		}

		return $array;
	}

    /**
     * Get args from source
     * For debugging return setup_request to review the request url, setup_params to review the params
     * @return array
     */
	public function get_callback() : array
	{	
		return [ $this, 'response' ];
	}

    /** 
     * Get method
     * @param object $method
     * @return string
     */
	public function get_method( $method ) : string
	{
		return $method;
	}

    /** 
     * Get permission callback
     * @return boolean
     */
	public function get_permission_callback() : ?bool
	{
		if ( ! current_user_can( 'edit_others_posts' ) ) {
			return null;
		}

		return true;
	}

    /** 
     * Get permission callback
     * @param string $path
     * @return string
     */
	public function get_path( $path )
	{
		return $path;
	}

    /** 
     * Response
     * @param object $request
     * @return object
     */
	abstract public function response( \WP_REST_Request $request ) : object;

	/**
	 * Make request
	 * @param object $request
	 * @return object or null
	 */
	public function make_request( $request ) : ?object
	{
		$metadata_request = $this->setup_request( $request );
		
		if ( ! $metadata_request ) {
			return null;
		}

		$args = $this->httpHeader;

		$response = wp_remote_get( $metadata_request, $args );

		if ( $response[ 'response' ][ 'code' ] > 400 || is_wp_error( $response ) ) {
			return null;
		}

		$response_body = wp_remote_retrieve_body( $response );
		$result = $response_body;

		return json_decode( $result );
	}

	/**
	 * Setup request
	 * @param object $request
	 * @return string or null
	 */
	public function setup_request( $request ) : ?string
	{        
		$params = $this->setup_params( $request );

		if ( array_filter( $params ) === false ) {
			return null;
		} 

		foreach( $params as $key => $value ) {
			if ( $key === null || $value === null || $value === '' ) {
				unset( $params[ $key ] );
			}
		}

		$formatted_request = $this->base . '?' . http_build_query( $params );

		return $formatted_request;
	}

	/**
	 * Setup params
	 * Can also use $request->get_json_params(), but need a way to sanitize params with that method
	 * @param object $request
	 * @return array or null
	 */
	public function setup_params( $request ) : ?array
	{
		$params = $this->accepted_params;
		$array = [];

		foreach ( $params as $param ) {
			$array[ $param ] = $request->get_param( $param );
		}

		$api_key = get_prh_title_meta_api_key();
		$array['api_key'] = $this->get_api_key( $api_key );

		return $array;
	}

	/**
	 * Get API Key
	 * @param string $api_key
	 * @return string or null
	 */
	protected function get_api_key( $api_key ) : ?string
	{
		if ( ! isset( $api_key ) ) {
			return null;
		}

		return $api_key;
	}
}
