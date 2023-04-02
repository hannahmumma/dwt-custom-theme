/**
 * ConditionalWrapper
 *
 * Container to wrap elements such as an a tag
 *
 * @param {Object} props
 * @param {string} props.condition
 * @param {Object} props.wrapper
 * @param {Object} props.children
 */
const ConditionalWrapper = ( { condition, wrapper, children } ) => condition ? wrapper( children ) : children;

export default ConditionalWrapper;
