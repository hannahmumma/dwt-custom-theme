<?php
/**
 * Custom blocks functions to support suggested designs and branding guidelines created for PRH Divisions.
 * 
 * @package dwt-custom-theme
 */

defined( 'ABSPATH' ) || die( 'Redirecting...' );

define( 'DWT_BLOCKS_DIRECTORY', 'assets/dist/blocks/' );

define(
	'DWT_BLOCKS',
	array(
		'book',	
		'book-cover',
		'button',
		'carousel',
		'contributor',
		'email-form',
		// 'example',
		'grid',
		'heading-with-paragraph',
		'featured-image',
		'image-with-text',
		'list-with-filters',		
		'list',
		'logo-banner',		
		'newsletter',		
		'text-with-cta'
	)
);

define( 'DWT_BLOCKS_NAMESPACE', 'dwt/' );

function dwt_enqueue_global_block_script() {
	wp_enqueue_script(
		'dwt-global-block-script', 
		get_template_directory_uri() . '/assets/dist/block-settings.min.js', [
			'wp-i18n',
			'wp-blocks',
			'wp-components',
			'wp-data',
			'wp-dom-ready',
			'wp-edit-post',
			'wp-hooks',
			'wp-rich-text'
		],
		DWT_CUSTOM_THEME_VERSION
	);
}

add_action( 'enqueue_block_editor_assets', 'dwt_enqueue_global_block_script' );

/**
 * Registers all blocks using the metadata loaded from the `block.json` file in each of the block folders.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @return void
 */
function dwt_register_custom_blocks()
{

	foreach ( DWT_BLOCKS as $block_name ) {
		$block_dir = trailingslashit( trailingslashit( get_stylesheet_directory() ) . DWT_BLOCKS_DIRECTORY . $block_name );

		if ( true === is_dir( $block_dir ) ) :
			register_block_type_from_metadata( $block_dir );
		
		else :
			
			$wp_error = new WP_Error( 'dwt-custom-blocks', 'DWT custom block type was not registered.', ' Path invalid: ' . $block_dir );
			trigger_error(
				$wp_error->get_error_message() . $wp_error->get_error_data(),
				E_USER_WARNING
			);
		endif;
	}
}

add_action( 'init', 'dwt_register_custom_blocks' );

/**
 * Register new category for PRH blocks
 *
 * @param array                   $block_categories     Array of categories for block types.
 * @param WP_Block_Editor_Context $block_editor_context The current block editor context.
 * @return array The merged array of block categories.
 */
function dwt_register_block_category( array $block_categories, WP_Block_Editor_Context $block_editor_context ) : array 
{
	if ( ! ( $block_editor_context instanceof WP_Block_Editor_Context ) ) {
		return $block_categories;
	}

	$block_categories = array_merge(
		array(
			array(
				'slug'  => 'prh-modules',
				'title' => 'PRH Modules',
			),
			array(
				'slug'  => 'prh-blocks',
				'title' => 'PRH Blocks',
			),			
			array(
				'slug'  => 'prh-media',
				'title' => 'PRH Media',
			),
		),
		$block_categories
	);

	return $block_categories;
}

add_filter( 'block_categories_all', 'dwt_register_block_category', 10, 2 );

function dwt_add_attributes_to_script( $tag, $handle ) : string
{

	$scripts = [
		'dwt-image-with-text-script',
		'dwt-email-form-script',
		'dwt-newsletter-script',
	];

	foreach ($scripts as $script) {
	    if ($script === $handle ) {
			return str_replace(' src', ' defer src', $tag);	
	    }
	}

	return $tag;
}

add_filter('script_loader_tag', 'dwt_add_attributes_to_script', 10, 2);

