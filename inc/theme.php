<?php

if ( ! defined( 'DWT_CUSTOM_THEME_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( 'DWT_CUSTOM_THEME_VERSION', '1.0.0' );
}

function init()
{
	if ( ! function_exists( 'dwt_custom_theme_setup' ) ) {
		return new WP_Error(
			'theme_not_found',
			'Theme was not found.',
			array(
				'status' => 404
			)
		);
	}

	dwt_custom_theme_setup();
}

function dwt_custom_theme_setup() 
{
	load_theme_textdomain( 'dwt-custom-theme', get_template_directory() . '/languages' );
	add_theme_support( 'title-tag' );
	
	register_nav_menus(
		array(
			'main_menu' => esc_html__( 'Main', 'dwt-custom-theme' ),
			'footer_menu' => esc_html__( 'Footer', 'dwt-custom-theme' ),
		)
	);

	/*
	 * Switch default core markup for search form
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	if ( is_customize_preview() && ! current_theme_supports( 'widgets' ) ) {
		add_theme_support( 'widgets' );
	}

	add_theme_support( 'editor-styles' );		
	add_editor_style( './assets/dist/css/style-editor.min.css' );
}

add_action( 'after_setup_theme', 'init' );

/**
 * Enqueue front end styles.
 */
function dwt_custom_theme_styles() 
{
	wp_enqueue_style( 
		'dwt-custom-theme-style', 
		get_template_directory_uri() . '/assets/dist/css/index.min.css', 
		array(), 
		DWT_CUSTOM_THEME_VERSION 
	);
}

add_action( 'wp_enqueue_scripts', 'dwt_custom_theme_styles', 9 );

/**
 * Enqueue front end scripts
 */
function dwt_custom_theme_scripts() 
{
	wp_enqueue_script( 
		'dwt-custom-theme-script', 
		get_template_directory_uri() . '/assets/dist/index.min.js', 
		array(), 
		DWT_CUSTOM_THEME_VERSION, true
	);

	$scripts = [ 'dwt-newsletter-script', 'dwt-custom-theme-script' ];

	foreach ( $scripts as $script ) {
		wp_localize_script( $script, 'ajax_object', array(
			'ajax_url' => admin_url('admin-ajax.php'),
			'nonce' => wp_create_nonce('ajax-nonce')
		),
		DWT_CUSTOM_THEME_VERSION
		);		
	}
}

add_action( 'wp_enqueue_scripts', 'dwt_custom_theme_scripts' );

/**
 * Enqueue admin styles.
 * Additional stylesheet to target elements outside of .editor-styles-wrapper
 */
function dwt_custom_theme_admin() 
{
	wp_enqueue_style( 
		'dwt-custom-theme-style', 
		get_template_directory_uri() . '/assets/dist/css/style-editor-extra.min.css', 
		array(), 
		DWT_CUSTOM_THEME_VERSION 
	);
}

add_action('admin_enqueue_scripts', 'dwt_custom_theme_admin');

function dwt_custom_theme_pingback_header() 
{
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}

add_action( 'wp_head', 'dwt_custom_theme_pingback_header' );


function limit_menu_admin_notice()
{
	global $pagenow;

	if ( $pagenow == 'nav-menus.php' ) {
		echo '<div class="notice notice-info">
			<p>Add up to 5 top level navigation items and up to 28 submenu items.</p>
		</div>';
		echo '<div class="notice notice-info">
			<p>Add up to 8 top level footer items (submenu items not supported).</p>
			</div>';        
	}
}

add_action('admin_notices', 'limit_menu_admin_notice');

/**
 * Add support for svgs
 */
function mimeTypes($mimes): array 
{
	$mimes['svg'] = 'image/svg+xml';

	return $mimes;
}

add_filter('upload_mimes', 'mimeTypes');

/**
 * Get Main menu nav items and add the data we need to the REST API
 */

function dwt_main_menu_endpoint()
{
	register_rest_route( 'dwt/v2', 'main-menu', array(
		'methods' => 'GET',
		'callback' => 'dwt_main_menu_callback',
		'permission_callback' => '__return_true'	
	) );
}

add_action( 'rest_api_init', 'dwt_main_menu_endpoint');

function dwt_main_menu_callback()
{
	$main_menu_items = wp_get_nav_menu_items( 'Main' );
	$arr = [];

	if ( count( $main_menu_items ) === 0 ) {
		return new WP_Error(
			'no_menus',
			'Menu not found.',
			array(
				'status' => 404
			)
		);
	}

	foreach( $main_menu_items as $main_menu_item ) {

    	$main_menu_obj = new stdClass();

	    $main_menu_obj->ID = $main_menu_item->ID;
	    $main_menu_obj->title = $main_menu_item->title;
	    $main_menu_obj->url = $main_menu_item->url;
	    $main_menu_obj->target = $main_menu_item->target;
	    $main_menu_obj->menu_item_parent = $main_menu_item->menu_item_parent;

	    array_push( $arr, $main_menu_obj );
	}
	
	return $arr;
}

/**
 * Get Footer nav items and add the data we need to the REST API
 */

function dwt_footer_menu_endpoint()
{
	register_rest_route( 'dwt/v2', 'footer-menu', array(
		'methods' => 'GET',
		'callback' => 'dwt_footer_menu_data',
		'permission_callback' => '__return_true'
	) );
}

add_action( 'rest_api_init', 'dwt_footer_menu_endpoint');

function dwt_footer_menu_data()
{
	$footer_menu = wp_get_nav_menu_items('Footer');

	if ( count( $footer_menu) === 0 ) {
		return null;
	}

	return $footer_menu;
}

/**
 * Handle body classes on index.php
 *
 * @param array  $classes - list of class names within the body element
 * @return array $classes - list of classes with blog removed and search-results-page added
 */
function handle_classes( $classes ) {
    global $wp;

    if ( in_array('blog', $classes ) ) {
        unset( $classes[ array_search( 'blog', $classes ) ] );
    }    

	if ( function_exists( 'get_field' ) && get_field( 'form_style', 'options' ) ) {
		$form_style = strtolower( get_field( 'form_style', 'options' ) );
    	$classes[] = " is-form-style-{$form_style}";		
	}

    $classes[] = 'is-front-end';

    if ( $wp->request === 'newsletter-signups' ) {
    	$classes[] = 'page-newsletter-signups';
    }

    return $classes;
}

add_action( 'body_class', 'handle_classes');

function admin_classes( $classes ) {

	if ( function_exists( 'get_field' ) && get_field( 'form_style', 'options' ) ) {
		$form_style = strtolower( get_field( 'form_style', 'options' ) );
		$classes .= " is-form-style-{$form_style}";
	}

	return $classes;
}

add_filter( 'admin_body_class', 'admin_classes' );
