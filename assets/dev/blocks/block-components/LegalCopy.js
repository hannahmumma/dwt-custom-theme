
/**
 * LegalCopy
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.className
 * @param {Object} props.style
 *
 */
const LegalCopy = ( { className, style } ) => {
	return (
		<p
			className={ className }
			style={ style }>
            By clicking Sign Up, I acknowledge that I have read and agree to Penguin Random House's <a href="https://www.penguinrandomhouse.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://www.penguinrandomhouse.com/terms/" target="_blank" rel="noopener noreferrer">Terms of Use</a> and understand that Penguin Random House collects <a href="https://www.penguinrandomhouse.com/privacy/#what-information-we-collect-about-you" target="_blank" rel="noopener noreferrer">certain categories of personal information</a> for the <a href="https://www.penguinrandomhouse.com/privacy/#how-we-use-your-information" target="_blank" rel="noopener noreferrer">purposes listed</a> in that policy, <a href="https://www.penguinrandomhouse.com/privacy/#our-disclosure-of-personal-information" target="_blank" rel="noopener noreferrer">discloses, sells, or shares certain personal information</a> and <a href="https://www.penguinrandomhouse.com/privacy/#retention-of-personal-information" target="_blank" rel="noopener noreferrer">retains personal information</a> in accordance with the <a href="https://www.penguinrandomhouse.com/privacy/" target="_blank" rel="noopener noreferrer">policy</a>. You can <a href="https://www.penguinrandomhouse.com/privacy/right-to-opt-out-of-sale-form/" target="_blank" rel="noopener noreferrer">opt-out</a> of the sale or sharing of personal information anytime.
		</p>
	);
};

export default LegalCopy;
