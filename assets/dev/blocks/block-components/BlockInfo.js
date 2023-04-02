/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.instructions
 */
const BlockInfo = ( { title, instructions } ) => {
	return (
		<div className='block__info'>
			<div class='block__info--inner p-20 rounded text-black'>
				<h5 className='heading-5 mt-0 mb-10'>{ title }</h5>
				<p className='m-0'>{ instructions }</p>
				<p className='mt-10 text-14'>Note: Background color and border are for placeholder purposes and will not be reflected on the front end</p>

			</div>
		</div>
	);
};

export default BlockInfo;
