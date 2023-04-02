import { BlockIcon } from '@wordpress/block-editor';

/**
 * DWTPlaceholder
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.icon
 * @param {string} props.title
 * @param {string} props.text
 */
const Placeholder = ( { icon, title, text } ) => {
	return (
		<div className="bg-white text-black p-10 flex flex-wrap border-solid border rounded max-w-[300px]">
			<BlockIcon className="mr-10" icon={ icon } />
			<h6 className="m-0">{ title }</h6>
			<p className="w-full text-12">{ text }</p>
		</div>
	);
};

export default Placeholder;
