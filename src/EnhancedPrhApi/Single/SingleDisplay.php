<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\EnhancedPrhApi\Single;

use DWT\Managers\APIManager;

/**
 * Single Display Class
 * Displays a single item e.g. book or contributor
 */
class SingleDisplay extends APIManager
{   
    /** 
     * @var string $base - PRH Metadata API base URL
     */	
	protected $base = 'https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US';

    /** 
     * @var string $param_to_match - param needed from remote API
     */
	protected $param_to_match;

    /** 
     * @var string $id - isbn or authorId
     */
	protected $id;

	public function __construct()
	{   
		$this->register_route(
			'dwt/v2',
			$this->wp_rest_endpoint,
			\WP_REST_Server::EDITABLE
		);
	}

	public function response( \WP_REST_REQUEST $request ) : object
	{
		$prh_metadata_api_data = $this->get_data( $request );

		if ( ! $prh_metadata_api_data ) {
			return new \WP_Error( 'no_data_found', esc_html__( '404 Not found', 'dwt-custom-theme' ), array( 'status' => 404 ) );
		}

		return new \WP_REST_Response( $prh_metadata_api_data, 200 );
	}

	private function get_data( $request ) : ?object
	{
		$returned_data = $this->make_request( $request );

		if ( ! $returned_data ) {
			return null;
		}

		$data = $returned_data->data;

		return $data;
	}

	public function setup_request( $request ) : ?string
	{
		$params = $this->setup_params( $request );

		if ( array_filter( $params ) === false ) {
			return null;
		} 

		foreach( $params as $key => $value ) {
			if ( $key === null || $value === null ) {
				unset( $params[ $key ] );
			}

			if ( $key === $this->param_to_match ) {
				$this->id = $value;				
				unset( $params[ $key ] );
			}
		}

		$query_params = http_build_query( $params );

		$formatted_request = $this->id ? "{$this->base}/{$this->endpoint}/{$this->id}/{$this->view}?{$query_params}" : null;

		return $formatted_request;
	}    
}
