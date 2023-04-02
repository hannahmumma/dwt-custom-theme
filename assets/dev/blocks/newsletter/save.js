/**
 * DWT dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';
import LegalCopy from '../block-components/LegalCopy';

/**
 * WP dependencies
 */

import { RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		image,
		borderColor,
		borderStyle,
		borderWidth,
		alt,
		heading,
		headingColor,
		text,
		textColor,
		legalText,
		legalTextColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'block__newsletter',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'newsletter__form',
	} );

	const newsletterInnerClasses = filterOutWhiteSpace( [
		'newsletter--inner',
		borderStyle,
		borderWidth,
	] );

	const altText = alt ?? ' ';

	const bgColor = backgroundColor ? { backgroundColor } : undefined;
	const bColor = borderColor ? { borderColor } : undefined;

	const hColor = headingColor ? { color: headingColor } : undefined;
	const tColor = textColor ? { color: textColor } : undefined;
	const ltColor = legalTextColor ? { color: legalTextColor } : undefined;

	return (
		<div { ...blockProps }>
			<div
				className={ newsletterInnerClasses }
				style={ { ...bgColor, ...bColor } }
			>
				<div className='newsletter-wrapper flex flex-col has-success'>

					{ image && (
						<div className='newsletter__image-wrapper'>
							<img src={ image } alt={ altText } />
						</div>
					) }

					{ heading.length > 0 && (
						<RichText.Content
							className='heading-4 newsletter__heading'
							style={ { ...hColor } }
							tagName='h4'
							value={ heading }
						/>
					) }

					{ text.length > 0 && (
						<RichText.Content
							className='paragraph-1 newsletter__text'
							style={ { ...tColor } }
							tagName='p'
							value={ text }
						/>
					) }

					{/*Block email-form*/}
					<div { ...innerBlocksProps } />
					{ legalText
						? <RichText.Content
							className='paragraph-3 newsletter__legal'
							style={ { ...tColor } }
							tagName='p'
							value={ legalText }
						/>
						: <LegalCopy
							className="paragraph-3 newsletter__legal"
							style={ { ...ltColor } }
						/>
					}
				</div>
			</div>
		</div>
	);
};

export default save;
