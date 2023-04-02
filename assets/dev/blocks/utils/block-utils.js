/**
 * Reusable scripts for our blocks
 */

import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

const getCurrentBlock = ( clientId ) => useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ) );

/**
 * getAllEditorBlocks
 *
 * Gets all blocks in the editor. Need to use with subscribe to get the updated list
 *
 * @return {Array} blocks
 */
const getAllEditorBlocks = () => useSelect( ( select ) => select( 'core/editor' ).getEditorBlocks() );

/**
 * getBlockAttrs
 *
 * Gets block attributes by clientId
 *
 * @param {string} clientId
 * @return {Object} attributes object
 */
const getBlockAttrs = ( clientId ) => useSelect( ( select ) => select( 'core/block-editor' ).getBlockAttributes( clientId ) );

/**
 * getBlockPropAttrs
 *
 * Get block prop attributers
 *
 * @param {Object} blockProps
 * @param {string} attrKey    name of attribute (e.g. className )
 * @param {string} attrValue  name of value (eg is-style-full-width)
 * @return {boolean} true/false
 */
const getBlockPropAttr = ( blockProps, attrKey, attrValue ) => {
	let attr = null;

	Object.entries( blockProps ).map( ( [ key, value ] ) => {
		if ( key === attrKey ) {
			attr = value.includes( attrValue );
		}
	} );

	return attr;
};

/**
 * getInnerBlocks
 *
 * Gets innerBlocks by parent clientId
 *
 * @param {string} clientId
 * @return {Object} parent's inner blocks
 */

const getInnerBlocks = ( clientId ) => useSelect( ( select ) => select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks );

/**
 * getInnerBlockSelectedState
 *
 * Gets innerBlocks seleted state
 *
 * @param {string} clientId
 * @return {boolean} true/false
 */
const getInnerBlockSelectedState = ( clientId ) => useSelect( ( select ) => select( 'core/block-editor' ).hasSelectedInnerBlock( clientId ) );

/**
 * getParentBlock
 *
 * Gets innerBlocks seleted state
 *
 * @param {string} clientId
 */
const getParentBlock = ( clientId ) => useSelect( ( select ) => select( 'core/block-editor' ).getBlockParents( clientId ) );

/**
 * getBlockParentsByName
 *
 * Gets innerBlocks seleted state
 *
 * @param {string} clientId
 * @param {string} blockName
 */
const getBlockParentsByName = ( clientId, blockName ) => useSelect( ( select ) => select( 'core/block-editor' ).getBlockParentsByBlockName( clientId, blockName ) );

/**
 * getParentBlockAttrs
 *
 * Retrieves updated attributes from the parent block
 *
 * @param {string} clientId
 * @return {Array} parent block attributes
 */
const getParentBlockAttrs = ( clientId ) => {
	const { parentBlock, childBlock } = useSelect( ( select ) => {
		return {
			parentBlock: select( 'core/block-editor' ).getBlockParents( clientId ),
			childBlock: select( 'core/block-editor' ),
		};
	} );

	return childBlock.getBlockAttributes( parentBlock );
};

const getBlockHierarchyAttrs = ( clientId ) => {
	const { parentBlock, childBlock } = useSelect( ( select ) => {
		return {
			parentBlock: select( 'core/block-editor' ).getBlockHierarchyRootClientId( clientId ),
			childBlock: select( 'core/block-editor' ),
		};
	} );

	return childBlock.getBlockAttributes( parentBlock );
};

/**
 * passAttrsToInnerBlocks
 *
 * Passes the newsletter block attributes to the email-form block and updates them in the email-form block when they're updated in the newsletter block
 *
 * @param {string} clientId
 * @param {Object} obj
 */
const passAttrsToInnerBlocks = ( clientId, obj ) => {
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const innerBlocks = getInnerBlocks( clientId );

	innerBlocks.forEach( ( block ) => {
		updateBlockAttributes( block.clientId, obj );
	} );
};

/**
 * notice
 *
 * Function to create a new notice
 *
 * @param {string}  status
 * @param {string}  msg
 * @param {string}  id
 * @param {boolean} isDismissible
 */
const addNotice = ( status, msg, id, isDismissible ) => {
	const { createNotice } = useDispatch( noticesStore );
	createNotice(
		status,
		msg,
		{ id, isDismissible }
	);
};

/**
 * getAllMissingAttrsState
 *
 * Handles error messaging if any required attrs are missing
 *
 * @param {Array} arr - required attrs (attribute objs)
 * @return {boolean} true/false
 */
const getAllMissingAttrsState = ( arr ) => {
	let error = false;
	arr.forEach( ( item ) => {
		if ( ! item ) {
			error = true;
		}
	} );

	return error;
};

/**
 * lockInnerBlocks
 *
 * Lock innerBlocks if min is set
 *
 * @param {Array}   innerBlocks
 * @param {number}  min         - number for locking
 * @param {boolean} lockAll     - lock both remove and move
 */
const lockInnerBlocks = ( innerBlocks, min, lockAll ) => {
	const lock = lockAll ? { remove: true, move: true } : { remove: true };

	Object.entries( innerBlocks ).map( ( [ key, value ] ) => {
		for ( const [ k, v ] of Object.entries( value ) ) {
			if ( k === 'attributes' && innerBlocks.length === min ) {
				v.lock = lock;
			}

			if ( innerBlocks.length > min ) {
				delete v.lock;
			}
		}
	} );
};

export {
	getCurrentBlock,
	getInnerBlocks,
	getInnerBlockSelectedState,
	getAllEditorBlocks,
	getBlockAttrs,
	getBlockPropAttr,
	getParentBlock,
	getParentBlockAttrs,
	getBlockParentsByName,
	getBlockHierarchyAttrs,
	passAttrsToInnerBlocks,
	addNotice,
	getAllMissingAttrsState,
	lockInnerBlocks,
};
