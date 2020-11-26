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
function findInDir(dir, filter, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
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
