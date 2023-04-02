// Set flag to include Preflight conditionally based on the build target.
const includePreflight = ( 'editor' === process.env._TW_TARGET ) ? false : true;
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const BASE = 16;
const rem = (px, key = px) => ({ [key]: `${px / BASE}rem` });

const pushToArr = () => {
    const arr = []
    for (let i = 1; i <= 500; i++) {
        arr.push(rem(i));
    }
    return arr;  
};
const array = pushToArr();
const sizesObj = Object.assign({}, ...array);

module.exports = {
	content: [
		// Ensure changes to JS, PHP files and `theme.json` trigger a rebuild.
		"./assets/dev/**/*.js",
		"./**/*.php",
		"./theme.json",
	],
    mode: "jit",
    corePlugins: {
        // Disable Preflight base styles in CSS targeting the editor.
        container: false,        
        preflight: includePreflight,
    },
    plugins: [
        plugin(({addComponents, theme }) => {
            addComponents({
                ".container": {
                    maxWidth: theme("maxWidth.1366")
                }
            })
        }),
        // Extract colors and widths from `theme.json`.
        require( '@_tw/themejson' )( require( './theme.json' ) ),
        require( '@tailwindcss/aspect-ratio' ),

        // Uncomment below to add additional first-party Tailwind plugins.
        // require( '@tailwindcss/forms' ),
        // require( '@tailwindcss/line-clamp' ),
    ],    
	theme: {
		// Extend the default Tailwind theme.
		extend: {
			// rounded-{ value } rounded-0, use `rounded` for default
            borderRadius: {
                0: "0",
                2: "2px",
                DEFAULT: "4px",
                6: "6px",
                8: "8px",
                10: "10px",
                16: "16px",
            },
            // border-{ value } default border is 1px
            borderWidth: {
                0: "0",
                2: "2px",
                4: "4px",
                5: "5px",                
                6: "6px",
                8: "8px",
                10: "10px",
            },
            // use `shadow` for default
            boxShadow: {
                DEFAULT: "0 3px 26px rgb(0 0 0 / 16%)",
                "book-img": "10px 13px 25px rgb(0 0 0 / 20%)",                
                modal: "10px 13px 16px rgb( 0 0 0 / 20%)",
            },
            colors: {
                'error-red': '#990D0D',
                'light-beige': '#FBF8F1',
                'light-gray': '#F6F6F6',
                'gray': '#707070'
            },
            // use for multiple objects - use for font sizes, line heights
            commonSizes: sizesObj,
        	// font-sans, font-serif, font-mono
            fontFamily: {
                sans: ["Fort", ...defaultTheme.fontFamily.sans],
                serif: ["Shift", ...defaultTheme.fontFamily.sans],
            },
            // text-12, use text-base for 16px
            fontSize: (defaultTheme) => defaultTheme("commonSizes"),
            // font-{ value }, font-300
            fontWeight: {
                200: "200",
                300: "300", // light
                400: "400", // normal
                500: "500", // medium
                700: "700", // bold
            },
            // gap-{ value }
            gap: (defaultTheme) => defaultTheme("commonSizes"),
            gridTemplateRows: {
                '7': 'repeat(7, minmax(0, 1fr))',
                '8': 'repeat(8, minmax(0, 1fr))',
            },            
            // leading-{ value }, leading-18
            lineHeight: (defaultTheme) => defaultTheme("commonSizes"),
            // m-{ value }, m-20
            margin: (defaultTheme) => defaultTheme("commonSizes"),
            // max-w-{ value }, max-w-11366
            maxWidth: {
                auto: "auto",
                1336: "1366",
            },
            // p-{ value }, p-20
            padding: (defaultTheme) => defaultTheme("commonSizes"),
            // xxs:{ value }
            screens: {
                xxs: "320px",
                xs: "375px",
                sm: "480px",
                md: "768px",
                lg: "1024px",
                xl: "1366px",
                xxl: "1920px",
                "screen-1466": "1466px",
            },
		},
	},
};
