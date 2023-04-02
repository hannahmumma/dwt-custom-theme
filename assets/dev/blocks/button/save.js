/**
 * DWT dependencies
 */

import { getBlockPropAttr } from '../utils/block-utils';
import { filterOutWhiteSpace } from '../utils/general-utils';
import { arrowRightIcon } from '../../img/icons';

/**
 * DWT Components
 */

/**
 * WP dependencies
 */

import { RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		text,
		textColor,
		width,
		textButtonOption,
		url,
		linkTarget,
		hasCTASlideFromCarousel,
		hasNewletterParentBlock,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'block__button',
	} );

	/**
	 * Handle additional logic
	 */

	const isFill = getBlockPropAttr( blockProps, 'className', 'is-style-fill' );
	const isOutline = getBlockPropAttr( blockProps, 'className', 'is-style-outline' );

	const isFillIsDefaultLogic = isFill || ( ! isFill && ! isOutline );

	const buttonTypeClass = ( ! textButtonOption && isFillIsDefaultLogic ) ? 'btn-primary'
		: ( ! textButtonOption && ! isFillIsDefaultLogic ) ? 'btn-secondary' : 'is-text-button';

	const noBackgroundClass = ( ! textButtonOption && ! backgroundColor ) ? 'no-background-color' : '';
	const noTextClass = ( ! textButtonOption && ! textColor ) ? 'no-text-color' : '';

	/**
	 * Handle element styles
	 */

	const bgColor = backgroundColor ? { backgroundColor } : undefined;
	const borderStyles = textColor ? { border: `1px solid ${ textColor }` } : undefined;

	const buttonStyles = isFillIsDefaultLogic && ! textButtonOption ? bgColor
		: ! isFillIsDefaultLogic && ! textButtonOption ? borderStyles : undefined;

	const textStyle = textColor ? { color: textColor } : undefined;

	/**
	 * Handle element classes
	 */

	const buttonWrapperClasses = `button-wrapper text-black flex gap-10 items-center w-${ width }`;

	const buttonClasses = filterOutWhiteSpace( [
		buttonTypeClass,
		noBackgroundClass,
		noTextClass,
		`w-${ width }`,
	] );

	const includeLinkTarget = url ? linkTarget : undefined;

	// make button data available for front end react component
	const buttonData = {
		buttonWrapperClasses,
		buttonClasses,
		buttonStyles,
		textStyle,
		text,
		url,
		linkTarget: includeLinkTarget,
	};

	const jsonButton = JSON.stringify( buttonData );
	const textLogic = hasNewletterParentBlock ? 'Sign up' : text;
	const renderInBlock = ( text || hasNewletterParentBlock ) && ! hasCTASlideFromCarousel ? true : false;

	return (
		renderInBlock && (
			<div { ...blockProps }>
				<div className={ buttonWrapperClasses } style={ { ...textStyle } } data-button-styles={ jsonButton }>
				
					{ textLogic && url && (
						<a  className={`flex items-center no-underline ${ buttonClasses }` } style={ { ...buttonStyles, ...textStyle } } href={ url ? url : null } target={ linkTarget ? '_blank' : null } rel={ linkTarget ? 'noopener' : null }>{ textLogic }</a>
					) }

					{ textLogic && ! url && (
						<RichText.Content
							className={ buttonClasses }
							tagName='button'
							value={ textLogic }
							style={ { ...buttonStyles, ...textStyle } }
						/>
					) }

					{ textButtonOption ? arrowRightIcon : undefined }

				</div>
			</div>
		)
	);
};

export default save;

