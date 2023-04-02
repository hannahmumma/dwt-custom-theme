<?php

function add_newsletter_signups( $wp_rewrite )
{
	$wp_rewrite->rules = array_merge(
		[ 'newsletter-signups/?$' => 'index.php?newsletter-signups=1' ],
		$wp_rewrite->rules
	);

	return $wp_rewrite;
}

add_filter( 'generate_rewrite_rules', 'add_newsletter_signups' );

function add_newsletter_signups_to_query_vars( $query_vars )
{	
	$query_vars[] = 'newsletter-signups';
	return $query_vars;
}

add_filter( 'query_vars', 'add_newsletter_signups_to_query_vars' );

function redirect_newsletter_signups()
{
	$newsletter_signups = intval( get_query_var( 'newsletter-signups' ) );

	if ( $newsletter_signups ) {
		include get_template_directory() . '/index.php';
		exit;
	}	
}

add_action( 'template_redirect', 'redirect_newsletter_signups' );
