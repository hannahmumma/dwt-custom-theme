/**
 * Registration/unregistration script
 *
 * Global functions for registering/unregistering blocks, format types, variations, etc.
 */

import { embedYouTubeIcon } from '../../img/icons';

const { __ } = wp.i18n;

const { 
	getBlockTypes,
	getBlockVariations, 
	registerBlockVariation,
	unregisterBlockType,
	unregisterBlockVariation,
} = wp.blocks;

const { select, subscribe } = wp.data;
const { unregisterFormatType } = wp.richText;

/**
 * init
 *
 * Run it
 */

const init = () => {
	// unregister variations before registering YouTube as default Embed
	unregisterVariations( 'core/embed' );
	unregisterVariations( 'core/social-link' );	
	registerYouTubeAsDefault();
	registerBlockVariations()

	unregisterFormatTypes();
	// unregisterBlockTypes();
	subscribe( _.debounce( unregisterBlockTypes ) );


	// console.log( wp.blocks.getBlockTypes() );
};

/**
 * unregisterVariations
 *
 * Unregister block variations
 *
 * @param {string} blockName
 * @see registerYouTubeAsDefault to see how we're handling the youtube variation
 */

const unregisterVariations = ( blockName ) => {
	let enabled = [
		'facebook',
		'instagram',
		'snapchat',
		'soundcloud',
		'spotify',
		'tiktok',
		'twitter',
		'vimeo',
		// 'youtube',
	];

	enabled = blockName === 'core/social-link' ? [ ...enabled, 'youtube' ] : enabled;
	const blockVariations = getBlockVariations( blockName );

	if ( blockVariations ) {
		blockVariations.forEach( ( block ) => {
			if ( ! enabled.includes( block.name ) ) {
				unregisterBlockVariation( blockName, block.name );
			}
		} );
	}
};

/**
 * setYouTubeEmbedAsDefault
 *
 * Replace the default embed block with YouTube.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */

const registerYouTubeAsDefault = () => {
	const youTube = {
		name: 'youtube',
		title: __( 'YouTube' ),
		icon: embedYouTubeIcon,
		keywords: [ __('music'), __( 'video' ) ],
		description: __( 'Embed a YouTube video.' ),
		isDefault: true,
		attributes: { providerNameSlug: 'youtube', responsive: true },
		isActive: ( blockAttributes, variationAttributes ) =>
			blockAttributes.providerNameSlug === variationAttributes.providerNameSlug,
	} ;

	registerBlockVariation( 'core/embed', youTube );
};

const registerBlockVariations = () => {

	const tuneIn = {
	    name: 'TuneIn',
	    title: 'TuneIn',
		attributes: { providerNameSlug: 'tunein', responsive: true },	    
	}
	registerBlockVariation( 'core/social-link', tuneIn );

}

/**
 * unregisterFormatTypes
 *
 * Unregister rich text format types
 */

const unregisterFormatTypes = () => {
	const disabled = [
		'core/text-color',
		'core/code',
		'core/keyboard',
		'core/strikethrough',
		'core/subscript',
		'core/superscript',
	];

	disabled.forEach( ( type ) => {
		unregisterFormatType( type );
	} );

	// console.log( select( 'core/rich-text' ).getFormatTypes() );

};

/**
 * unregisterBlockTypes
 *
 * Unregister blocks not included in the allowedBlocks array
 */

const unregisterBlockTypes = () => {

	const currentPostType = select( 'core/editor').getCurrentPostType();
	const slug = select( 'core/editor').getEditedPostSlug();	
	
	let allowedBlocks = [
		'core/embed',
		'core/heading',
		'core/image',
		'core/list',
		'core/list-item',
		'core/paragraph',
		'core/pullquote',
		'core/separator',
		'core/social-link',
		'core/social-links',
		'core/spacer',
		'core/table',
		'dwt/book',
		'dwt/book-cover',
		'dwt/button',
		'dwt/carousel',
		'dwt/contributor',
		'dwt/email-form',
		// 'dwt/example',
		'dwt/featured-image',
		'dwt/grid',
		'dwt/heading-with-paragraph',
		'dwt/image-with-text',
		'dwt/list',
		'dwt/logo-banner',
		'dwt/newsletter',
		'dwt/text-with-cta',
	];

	if ( currentPostType === 'bookcategory' || currentPostType === 'imprint' || slug === 'books' || slug === 'authors' ) {
		allowedBlocks = [
			'core/paragraph',
			'core/heading',	
			'core/social-link',
			'core/social-links',
			'dwt/book',
			'dwt/book-cover',
			'dwt/button',
			'dwt/contributor',
			'dwt/featured-image',
			'dwt/list-with-filters',
			'dwt/heading-with-paragraph',
			'dwt/image-with-text',
			'dwt/list',
			'dwt/logo-banner',
			'dwt/text-with-cta',
		];
	}

	getBlockTypes().forEach( ( blockType ) => {
		if ( allowedBlocks.indexOf( blockType.name ) === -1 ) {
			unregisterBlockType( blockType.name );
		}
	} );
};

export { init };
