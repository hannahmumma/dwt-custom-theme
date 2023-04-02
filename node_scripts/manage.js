/**
 * Copy static assets
 * Since we're not using Webpack and copying directories is limited with esbuild, we can use this script
 * Should consider switching to Webpack if this becomes too unwieldy 
 */

const fse = require("fs-extra");

/**
 * manageAssets
 * 
 * Copies/watches static asset folders and moves them from dev to dist
 * @param {function} callback
 */

const manageAssets = (callback) => {
    const sourceFiles = {
        "img": "./assets/dev/img",
        "fonts": "./assets/dev/fonts" 
    };

    for ( const [key, value] of Object.entries(sourceFiles) ) {
        const destination = `./assets/dist/${key}`;
        callback(value, destination);
    }
};

module.exports = { manageAssets };
