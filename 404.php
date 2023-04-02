<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package dwt-custom-theme
 */

get_header();
?>

	<main id="primary">

		<section>
			<header>
				<h1 class="entry-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'dwt-custom-theme' ); ?></h1>
			</header>

			<div class="entry-content">

			</div>
		</section>

	</main><!-- #main -->

<?php
get_footer();
