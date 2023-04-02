const { addFilter } = wp.hooks;

const init = () => {
	addFilter(
		'blocks.registerBlockType',
		'dwt-custom-theme/disable-alignment',
		disableAlignment
	);
};

const disableAlignment = ( settings, name ) => {
	const blocks = [ 'core/embed', 'core/heading', 'core/pullquote', 'core/social-links', 'core/table' ];

	if ( ! blocks.includes( name ) ) {
		return settings;
	}

    return lodash.assign( {}, settings, {
        supports: lodash.assign( {}, settings.supports, {
            align: false,
        } ),
    } );
};

export { init };
