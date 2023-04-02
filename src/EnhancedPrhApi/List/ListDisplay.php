<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT\EnhancedPrhApi\List;

use DWT\Managers\APIManager;

/**
 * ListDisplay Class
 * Displays a list e.g. books or contributors
 */
class ListDisplay extends APIManager
{   
	protected $base = 'https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US';

	protected $view ='views/list-display';

	protected $endpoint;

	protected $accepted_params = [ 
		'filterBy',
		'divisionCode',
		'imprintCode',
		'seriesCode',
		'catUri',
		'catSetId',
		'showCovers',
		'sort',
		'dir',
		'start',
		'rows',
		'workOnSaleFrom',
		'workOnSaleTo',
	];

	protected $accepts_multiple_values = [
		'divisionCode', 
		'imprintCode',
		'seriesCode',
		'catUri',
	];

	protected $wp_rest_endpoint;

	public function __construct()
	{   
		$this->register_route(
			'dwt/v2',
			$this->wp_rest_endpoint,
			\WP_REST_Server::EDITABLE,
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

		$data = $returned_data;

		return $data;
	}

	public function setup_request( $request ) : ?string
	{
		$params = $this->setup_params( $request );
		$query_params = $this->process_params( $params );

		$formatted_request = "{$this->base}/{$this->endpoint}/{$this->view}?{$query_params}";

		return $formatted_request;
	}  

	private function process_params( array $params ) : ?string
	{
		$multiples = $this->accepts_multiple_values;

		if ( array_filter( $params ) === false ) {
			return null;
		}

		$arr = [];

		foreach( $params as $key => $value ) {
			if ( $key === null || $value === null || $value === '' ) {
				unset( $params[ $key ] );
			}

			if ( $key === 'filterBy' && isset( $value ) ) {
				$params[ $key ] = $value;
				$params[ $value ] = 'true';
				unset( $params[ $key ] );
			}

			$processed_params = $this->process_params_with_multiple_values( $params, $key, $value, $multiples );
			array_push( $arr, $processed_params );
		}

		$extras = $this->return_string( $arr ) ?? null;
		$append_extras = $extras ? "&{$extras}" : null;
		$query_params = http_build_query( $params );

		$foramtted_params = "{$query_params}{$append_extras}";

		return $foramtted_params;
	}

	private function process_params_with_multiple_values( array &$p, string $k, mixed $v, array $multiples ) : ?array
	{
		$array_from_str = null;
		
		foreach( $multiples as $multiple) {

			if ( $k === $multiple ) {

				$need_array = strpos( $v, ',') !== false;

				if ( ! $need_array ) {
					return null;
				}
				
				unset( $p[ $k ] );

				$array_from_str = $this->return_array( $v, $multiple );
			}
		}

		return $array_from_str;
	}

	private function return_array( string $value, string $multiple ) : array
	{
		$arr = explode ( ",", $value );
		$arr = preg_filter('/^/', "{$multiple}=", $arr );
		$arr = preg_filter('/$/', '&', $arr);

		return $arr;
	}

	private function return_string( array $array ) 
	{
		$filtered = array_filter( $array );
		$merged = call_user_func_array( 'array_merge', $filtered );
		$implode = implode( str_replace( ' ', '', $merged ) );
		$str = rtrim( $implode, '&' );

		return $str;
	}
}
