import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * DWTRequiredFields
 *
 * A DWT reusable component
 *
 * @param {Object}  props
 * @param {Array}   props.requiredAttrs
 * @param {boolean} props.missingAttrsState
 * @param {string}  props.subtitle
 */
const RequiredFields = ( { requiredAttrs, missingAttrsState, subtitle } ) => {
	const subtitleClasses = ! requiredAttrs ? 'mb-0' : 'mb-8';
	return (
		<PanelBody
			title={ __( 'Required fields', 'dwt-custom-theme' ) }
			opened={ missingAttrsState ? true : false }
			className={ ! missingAttrsState && ( 'required-is-complete' ) }
		>
			<div className={ missingAttrsState && ( `border-2 border-solid border-error-red p-4` ) }>
				<h4 className={ subtitleClasses }>{ subtitle }</h4>
				<ul className='ml-10 pl-10 list-disc'>
					{ requiredAttrs?.map( ( item, key ) => {
						return (
							<li key={ key }>{ item }</li>
						);
					} ) }
				</ul>
			</div>
		</PanelBody>
	);
};

export default RequiredFields;
