<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */
namespace DWT;

/**
 * PRH Newsetter Signup Object
 *
 * Creates an instance of PRHNewsletterSubscription to post signup data to PRH Mail API
 * Currently set up for PRH Messaging Web Services V1
 * For V2, will have to add API keys and make any other changes required by the new version
 * 
 * @see https://randomhouse.app.box.com/s/rmlhth3stzl4pgqiisa7er9dh8odfg8n
 */
class PRHNewsletterSubscription
{
    /**
     * Base Endpoint
     *
     * @var string
     */
    private $endpoint = 'https://api.penguinrandomhouse.com';
    // private $endpoint = 'https://api-test.penguinrandomhouse.com/tst';

    /**
     * Endpoint path
     *
     * @var string
     */    
    private $path = '/rest/v1/json/subscription/programsubscribejson/set';

    /**
     * HTTP headers to send
     *
     * @var array
     */    
    private $httpHeader = [
        'headers' => [
            'Content-Type: application/json;charset=utf-8'
        ]
    ];

    /**
     * Construct
     * 
     * @return void
     */
    public function __construct()
    {
        add_action( 'wp_ajax_init_signup', [$this, 'init_signup'] );
        add_action( 'wp_ajax_nopriv_init_signup', [$this, 'init_signup'] );
    }

    /**
     * Initialize
     * 
     * @return void
     */
    public function init_signup() : void
    {
        $this->post_request();
    }

    /**
     * Make request
     * 
     * @return object or null
     */
    public function post_request() : ?object
    {
        $verified = $this->verify_nonce();  
        $request = $this->setup_request();
        $args = $this->httpHeader;

        if ( $verified ) {
           $response = wp_remote_get($request, $args);

            if ($response['response']['code'] > 400 || is_wp_error($response)) {
                return null;
            }

            $response_body = wp_remote_retrieve_body($response);
            $result = $response_body;

            echo $result;
        }
        
        wp_die();        
    }

    /**
     * Set up and format request URL
     * 
     * @return string or null
     */
    private function setup_request() : ?string
    {
        $params = $this->setup_params();

        if (array_filter($params) === false) {
            return null;
        } 

        foreach($params as $key=>$value) {
            if ( $value === '') {
                unset($params[$key]);
            }
        }

        $formatted_request = $this->endpoint . $this->path . '?' . http_build_query($params);

        return $formatted_request;
    }

    /**
     * Get variables from hidden fields in Newsletter Subscribe form
     * 
     * @return array
     */
    private function setup_params() : array
    {
        $email = isset($_REQUEST['email']) ? sanitize_email( $_REQUEST['email']) : '';
        $site_id = isset($_REQUEST['siteId']) ? sanitize_text_field( $_REQUEST['siteId']) : '';
        $program_id = isset($_REQUEST['programId']) ? sanitize_text_field( $_REQUEST['programId']) : '';
        
        $welcome_email = isset($_REQUEST['welcomeEmail']) ? sanitize_text_field( $_REQUEST['welcomeEmail']) : 1;
        $filter_welcome_email = filter_var($welcome_email, FILTER_VALIDATE_BOOLEAN);
        $convert = $filter_welcome_email === true ? 1 : 0;

        $subs = $site_id && $program_id ? "{$site_id},{$program_id},{$convert}" : '';

        $preference_id = isset($_REQUEST['preferenceId']) ? sanitize_text_field( $_REQUEST['preferenceId']) : '';
        $preference_key = isset($_REQUEST['preferenceKey']) ? sanitize_text_field( $_REQUEST['preferenceKey']) : '';
        $preference_text = isset($_REQUEST['preferenceText']) ? sanitize_text_field( $_REQUEST['preferenceText']) : '';

        if ( $preference_id ) {
            $prefs = $site_id && $program_id ? rtrim("{$site_id},{$program_id},{$preference_id},{$preference_key},{$preference_text}", ',') : '';
        }

        $acquisition_code = isset($_REQUEST['acquisitionCode']) ? sanitize_text_field( $_REQUEST['acquisitionCode']) : '';
        $ref_url = isset($_REQUEST['refUrl']) ? sanitize_url( $_REQUEST['refUrl']) : '';

        return [
            'Email' => $email,
            'Subs' => $subs,
            'Prefs' => $prefs,
            'Acqcode' => $acquisition_code,
            'Refurl' => $ref_url
        ];
    }

    /**
     * Verify nonce
     *
     * @return bool
     */
    private function verify_nonce() : bool
    {
        $nonce = isset( $_REQUEST['nonce'] ) ? $_REQUEST['nonce'] : ''; 

        if ( ! wp_verify_nonce($nonce, 'ajax-nonce')) {
            wp_send_json_error();
            return false;
        } else {
            return true;
        }
    }
}
