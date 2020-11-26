/***
 * This piece of code loads all the files from a routes folder
 * For example in an app created via express-generator, it would load all the files
 * from the /routes folder
 *
 * With this script you DON'T have to manually load routes in your app.js anymore
 * app.use('/', require('./routes/index'));
 *
 * USAGE: In your app.js add the following line:
 *
 * require('./config/routes.js')(app, options);
 *
 * OPTIONS:
 *    - dir: path to where you are storing your routes.
 *              It's relative to wherever you have this file (Ex: './config/routes.js').
 *           Default: __dirname + '/../routes'
 *
 *    - path: path you wish to have in your url routes. (Ex: localhost:3000/api/users).
 *               Default: '/'
 *
 ***/
'use strict';
const fs = require('fs');
const path = require('path');
module.exports = function (app, options = {}) {
    console.log(__dirname);
    let defaults = {
        dir: 'routes',
        path: '/'
    };
    options = options || {};
    const params = Object.assign(defaults, options);
    let fullPath = __dirname + '/../' + params.dir
    findInDir(fullPath, /\.js$/).forEach(file => {
        file = file.replace(params.dir + '/', '').slice(0, -3);
        let routeFile = require(fullPath + '/' + file);
        let route = file.replace('index', '');
        app.use(params.path + route, routeFile);
    });
};
/**
 *
 * @param dir
 * @param filter regex (ex: /\.js$/)
 * @param fileList
 * @returns {*[]}
 */
function findInDir(dir, filter, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const fileStat = fs.lstatSync(filePath);
        if (fileStat.isDirectory()) {
            findInDir(filePath, filter, fileList);
        } else if (filter.test(filePath)) {
            let file = path
                .relative(process.cwd(), filePath)
                .replace(/\\/g, '/')// if windows...
            fileList.push(file);
        }
    });
    return fileList;
}
