<?php

/*
* Creating a function to create our CPT
*/
  
function book_category_custom_post_type() {
	$labels = array(
		'name'                => _x( 'Book Category', 'Post Type General Name', 'dwt-custom-theme' ),
		'singular_name'       => _x( 'Book Category', 'Post Type Singular Name', 'dwt-custom-theme' ),
		'menu_name'           => __( 'Book Category', 'dwt-custom-theme' ),
		'parent_item_colon'   => __( 'Parent Book Category', 'dwt-custom-theme' ),
		'all_items'           => __( 'All Book Categories', 'dwt-custom-theme' ),
		'view_item'           => __( 'View Book Category', 'dwt-custom-theme' ),
		'add_new_item'        => __( 'Add New Book Category', 'dwt-custom-theme' ),
		'add_new'             => __( 'Add New', 'dwt-custom-theme' ),
		'edit_item'           => __( 'Edit Book Category', 'dwt-custom-theme' ),
		'update_item'         => __( 'Update Book Category', 'dwt-custom-theme' ),
		'search_items'        => __( 'Search Book Category', 'dwt-custom-theme' ),
		'not_found'           => __( 'Not Found', 'dwt-custom-theme' ),
		'not_found_in_trash'  => __( 'Not found in Trash', 'dwt-custom-theme' ),
	);

	$args = array(
		'label'               => __( 'Book Category', 'dwt-custom-theme' ),
		'description'         => __( 'Custom book categories', 'dwt-custom-theme' ),
		'labels'              => $labels,
		'supports'            => array( 'author', 'editor', 'title' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_icon'			  => 'dashicons-category',
		'menu_position'       => 5,
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		// 'taxonomies'		  => array( 'category' ),		
		'show_in_rest'		  => true,
		'template_lock' => 'all',
		'rewrite' => array('slug' => 'book-category'),
	);

	register_post_type( 'Book Category', $args );
}

add_action( 'init', 'book_category_custom_post_type', 0 );
