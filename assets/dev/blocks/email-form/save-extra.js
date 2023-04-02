
const processNewsletterAttrs = ( newsletterAttrs ) => {
	const apiSettings = {};

	Object.entries( [ newsletterAttrs ] ).map( ( [ key, value ] ) => {
		for ( const [ k, v ] of Object.entries( value ) ) {
			if ( k.endsWith( 'Api' ) && v !== '' ) {
				const cleanUpKey = k.split( 'Api' )[ 0 ];
				apiSettings[ cleanUpKey ] = v;
			}
		}
		return apiSettings;
	} );

	return createInputFields( apiSettings );
};

const createInputFields = ( settings ) => {
	const inputFields = Object.entries( settings ).map( ( [ key, value ] ) => {
		return (
			<input type="hidden" name={ key } value={ value.toString() } />
		);
	} );

	return inputFields;
};

export { processNewsletterAttrs };
