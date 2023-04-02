<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package dwt-custom-theme
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( "charset" ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="profile" href="https://gmpg.org/xfn/11">
		<?php wp_head(); ?>
		<?php
			if ( class_exists( 'ACF' ) ) {
				global_options_settings::add_color_settings();
			}
		?>
	</head>
	<div class="wrapper flex flex-col">
		<body <?php body_class(); ?>>
			<?php wp_body_open(); ?>
			<a href="#main" class="absolute top-auto left-auto p-1 opacity-0 -z-1 hover:opacity-100 focus:opacity-100 active:opacity-100 hover:underline hover:z-10 focus:z-10 active:z-0"><?php esc_html_e( 'Skip to content', 'dwt-custom-theme' ); ?></a>
			<header class="header bg-[#121212] relative z-50"></header>
