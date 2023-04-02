<?php

/*
* Creating a function to create our CPT
*/
  
function imprint_custom_post_type() {
	$labels = array(
		'name'                => _x( 'Imprint', 'Post Type General Name', 'dwt-custom-theme' ),
		'singular_name'       => _x( 'Imprint', 'Post Type Singular Name', 'dwt-custom-theme' ),
		'menu_name'           => __( 'Imprint', 'dwt-custom-theme' ),
		'parent_item_colon'   => __( 'Parent Imprint', 'dwt-custom-theme' ),
		'all_items'           => __( 'All Imprints', 'dwt-custom-theme' ),
		'view_item'           => __( 'View Imprint', 'dwt-custom-theme' ),
		'add_new_item'        => __( 'Add New Imprint', 'dwt-custom-theme' ),
		'add_new'             => __( 'Add New', 'dwt-custom-theme' ),
		'edit_item'           => __( 'Edit Imprint', 'dwt-custom-theme' ),
		'update_item'         => __( 'Update Imprint', 'dwt-custom-theme' ),
		'search_items'        => __( 'Search Imprint', 'dwt-custom-theme' ),
		'not_found'           => __( 'Not Found', 'dwt-custom-theme' ),
		'not_found_in_trash'  => __( 'Not found in Trash', 'dwt-custom-theme' ),
	);

	$args = array(
		'label'               => __( 'Imprint', 'dwt-custom-theme' ),
		'description'         => __( 'Customize imprints', 'dwt-custom-theme' ),
		'labels'              => $labels,
		'supports'            => array( 'author', 'editor', 'title'),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_icon'			  => 'dashicons-buddicons-topics',
		'menu_position'       => 6,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		// 'taxonomies'		  => array( 'category' ),
		'show_in_rest'		  => true,
		'template_lock' => 'all',
	);

	register_post_type( 'imprint', $args );
}

add_action( 'init', 'imprint_custom_post_type', 0 );
