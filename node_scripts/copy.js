const fse = require("fs-extra");
const manage = require("./manage");

/**
 * copyAssets
 * 
 * Copies static asset folders and moves them from dev to dist
 * @param {string} value
 * @param {string} destination
 * 
 */

const copyAssets = (value, destination) => {
    fse.copySync(value, destination, { overwrite: true }, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("success!");
        }
    });
}

manage.manageAssets(copyAssets);
module.exports = { copyAssets };