/**
 * Global utilities
 *
 * Functions to handle behavior on a post/global level outside of the editor
 */

const { select, subscribe } = wp.data;

const getDWTBlocks = () => {
	const updatedBlockList = getEditorBlocksList();

	const dwtBlocks = [];

	updatedBlockList.forEach( ( block ) => {
		if ( block.name?.includes( 'dwt' ) ) {
			dwtBlocks.push( block );
		}
	} );

	return dwtBlocks;
};

/**
 * handleNotices
 *
 * Handle notices
 *
 * @param {string} noticeID - notice id, which is given to the notice when it's created
 * @return {string} blockName - block name
 */

const handleNotices = () => {
	subscribe( _.debounce( () => {
		// TODO: add logic for notices
	} ) );
};

/**
 * getNoticesList
 *
 * Get notices
 *
 * @return {Array} notices
 */

const getNoticesList = () => select( 'core/notices' ).getNotices();

/**
 * getBlockList
 *
 * Get block list
 *
 * @return {Array} blocks
 */

const getEditorBlocksList = () => select( 'core/editor' ).getEditorBlocks();

/**
 * getBlockList
 *
 * Get block list
 *
 * @return {Array} blocks
 */

const getBlockList = () => select( 'core/block-editor' ).getBlocks();

export {
	getDWTBlocks,
	handleNotices,
	getNoticesList,
	getEditorBlocksList,
	getBlockList,
};

