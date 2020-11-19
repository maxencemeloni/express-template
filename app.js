const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const logger = require("./library/logger");
require('dotenv').config();

/* Start Security Middlewares */
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
//const mongoSanitize = require('express-mongo-sanitize');  // Uncomment if you use mongodb
const xss = require('xss-clean');
const hpp = require('hpp');
app.use(helmet());
const limit = rateLimit({
    max: 10,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
    message: 'Too many requests' // message to send
});
app.use('/login', limit); // Setting limiter on specific route
app.use(express.json({ limit: '10kb' }));
// app.use(mongoSanitize()); // Uncomment if you use mongodb
app.use(xss())
app.use(hpp());
/* End Security Middlewares */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

app.use(morgan('tiny', {stream: logger.stream}));

const indexRoutes = require('./routes/index.route.js');
const timeRoutes = require('./routes/time.route.js');
const usersRoutes = require('./routes/users.route.js');

app.use('/', indexRoutes);
app.use('/time', timeRoutes);
app.use('/users', usersRoutes);


module.exports = app;

// TODO: add a routes autoloader
/*const fs = require("fs");
const routePath = "./routers/";
fs.readdirSync(routePath).forEach(file => {
    const route = routePath + file;
    require(route)(app);
});
module.exports=function(app){
    app.get('/',function(req,res){
        res.send('/ called successfully...');
    });
}
or
https://gist.github.com/ybrodsky/e54792b17b89dc85a5c6acea4d58e077
or
https://www.npmjs.com/package/express-load-routes
*/
