import { ColorPalette } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.baseStyle
 * @param {string} props.borderColor
 * @param {Object} props.handleBaseStyle
 * @param {Object} props.handleBorderColor
 */
const BaseStyles = ( { baseStyle, borderColor, handleBaseStyle, handleBorderColor } ) => {
	return (
		<>
			<SelectControl
				label={__( 'Base Style', 'dwt-custom-theme' ) }
				value={ baseStyle }
				options={ [
					{ label: 'Default', value: 'is-default-base' },
					{ label: 'Bump up', value: 'has-bump-up' },
					{ label: 'Curved', value: 'has-curve' },
				] }
				onChange={ handleBaseStyle }
				__nextHasNoMarginBottom
			/>
			<div className="components-base-control">
				<p className='editor-subtitle'>Border Color</p>
				<ColorPalette
					value={ borderColor }
					onChange={ handleBorderColor }
					clearable={ false }
				/>
			</div>
		</>
	);
};

export default BaseStyles;
