<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */

function dwt_settings_endpoint()
{
    register_rest_route( 'dwt/v2', 'settings', array(
        'methods' => 'GET',
        'callback' => 'dwt_custom_settings_callback',
		'permission_callback' => '__return_true'
    ) );
}

add_action( 'rest_api_init', 'dwt_settings_endpoint' );

function dwt_custom_settings_callback()
{
	$logos = [ 'mobile_logo', 'site_logo', 'footer_logo' ];
	$arr = [];

	foreach ( $logos as $logo ) {
		$id = get_theme_mod( $logo );
		$image = isset( $id ) ? wp_get_attachment_image_src( $id, 'full' ) : null;
		$image_alt = isset( $id ) ? get_post_meta( $id, '_wp_attachment_image_alt', true ) : null;

	    $image_obj = new stdClass();
	    $image_obj->name = $logo;
	    $image_obj->url = $image[0] ?? null;
	    $image_obj->alt = $id ? $image_alt : null;

	    array_push( $arr, $image_obj );
	}

	return $arr;
}

function dwt_logo_settings_customizer( $wp_customize ) 
{
	$logos = [ 'mobile_logo', 'site_logo', 'footer_logo' ];

	foreach ( $logos as $logo ) {
		$wp_customize->add_setting( $logo );
		$wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, $logo,
			array(
				'label' => __( str_replace( '_', ' ', ucwords( $logo ) ), 'dwt-custom-theme' ),
				'section' => 'title_tagline',
				'settings' => $logo,
			)
		) );
	}
}

add_action( 'customize_register', 'dwt_logo_settings_customizer' );
