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
const fs = require('fs-readdir-recursive');
const path = require('path');
// TODO rewrite with recursive shit
module.exports = function (app, options) {
    let defaults = {
        dir: __dirname + '/../routes',
        path: '/'
    };
    options = options || {};
    const params = Object.assign(defaults, options);
    fs
        .readdirSync(params.dir)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const route = require(params.dir + '/' + file);
            app.use(file === 'index.js' ? '/' : defaults.path + file.slice(0, -3), route);
        });
};
