/**
 * WP dependencies
 */

import { RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		heading,
		headingColor,
		text,
		textColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'block__heading-with-paragraph',
	} );

	/**
	 * Handle additional logic
	 */

	const showTextBlock = heading.length > 0 || text.length > 0 ? true : false;

	/**
	 * Handle element styles
	 */

	const hColor = headingColor ? { color: headingColor } : undefined;
	const tColor = textColor ? { color: textColor } : undefined;

	return (
		showTextBlock && (
			<div { ...blockProps }>
				<div className="heading-with-paragraph--inner flex flex-col w-full">
					{ heading.length > 0 && (
						<RichText.Content
							className='heading-2 heading-with-paragraph__heading text-black break-normal'
							style={ { ...hColor } }
							tagName='h2'
							value={ heading }
						/>
					) }

					{ text.length > 0 && (
						<RichText.Content
							className='paragraph-2 heading-with-paragraph__text text-black break-normal'
							style={ { ...tColor } }
							tagName='p'
							value={ text }
						/>
					) }

				</div>
			</div>
		)
	);
};

export default save;
