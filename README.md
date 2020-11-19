# Express Template

This is a ready to Use **Express API**

[Changelog](#changelog)

### Global Features

Branch  | Description | Status
------------- | ------------- | -------------
main  | Full api without datasource | 
mysql  | Datasource Mysql, simple code | Online
mysql+typetron  | Datasource Mysql + Typetron (ORM) | 
mysql-async  | Datasource mysql with async/await | 
mongo  | Datasource MongoDb | 
mongo-mysql  | Example with 2 differents datasources | 
mongo-socketio  | Datasource MongoDb and Socket.io | 
mysql-socketio  | Datasource Mysql and Socket.io | 

**- [PM2](https://pm2.keymetrics.io/) ready** 

**- Security :** Default security middlewares are use (read more about security links: [1](https://itnext.io/make-security-on-your-nodejs-api-the-priority-50da8dc71d68) [2](https://nodesource.com/blog/nine-security-tips-to-keep-express-from-getting-pwned) [3](https://www.freecodecamp.org/news/express-js-security-tips/))

**- Logging :** [Morgan](https://www.npmjs.com/package/morgan) + [Winston](https://www.npmjs.com/package/winston)

**- Auto-loaded Routes**

**- [JWT](https://www.npmjs.com/package/jsonwebtoken) authentification**

**- Environment based configuration :** see [config](https://www.npmjs.com/package/config)

**- UltraLight homemade Mysql ORM**

## Structure :
- **bin/**:
    -  **www**: http server (script to start)
- **config/**: configuration folder, the file will be selected in relation to the NODE_ENV, the default file will be selected if the file related to NODE_ENV does not exists.
    - **default.json**: Opposite than .env, config files will not contain sensitive data
    - **production.json**
    - **[test|development].json**
- **controllers/**
- **datasources/**: Connection to specific datasource
- **library/** contains specific libraries
- **logs/** 
- **middlewares/**
- **models/**
- **public/**
    - **uploads/**
- **routes/**
- **services/**: fetch data on external api/services
- **tmp/**
- **utils/**: specifics utils
- **app.js**
- **.env.example**: dont forget to duplicate this (.env)) 
- **pm2.json**: pm2 file to fill

**Flow reminder :**

> client(req) &rarr; route &rarr; middleware &rarr; controller (req) &rarr; model &rarr; controller (res) &rarr; client;

> client(req) &rarr; route &rarr; middleware &rarr; controller (req) &rarr; service &rarr; controller (res) &rarr; client;

## Functionalities

### pm2
[PM2 documentation](https://pm2.keymetrics.io/)

./pm2.json is the configuration file, you have to fill **name** and **logs names**

pm2 logs need a folder in /var/logs
`$ sudo mkdir /var/logs/pm2 && sudo chmod 777 /var/logs/pm2`

pm2 has to be installed globally
`$ sudo npm i -g pm2`

To start
`$ pm2 start pm2.json`

#### usage
list process:
`$ pm2 limit`

stop:
`$ pm2 stop <processID>`
or 
`$ pm2 stop <processName>`

restart:
`$ pm2 restart <processID>`
or 
`$ pm2 restart <processName>`

delete:
`$ pm2 delete <processID>`
or 
`$ pm2 delete <processName>`

**Real time monitoring:**

- full logs :
    `$ tail -fn 200 /var/logs/pm2/<your app>.out`
- errors :
    `$ tail -fn 200 /var/logs/pm2/<your app>-error.out`
    
    **200** is the number of line to display (log history);
    
## json web token
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

this is a simple authentication method.

./library/JWT.js

./middleware/authentication.js

**DEFINE A REAL ENCRYPTED FOR THE SIGN (.env JWT_KEY)**

**set (in controller):**
```javascript
const JWT = require('../library/JWT');
//...
let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
JWT.set(user, ip);
//...
```

**check (middleware on a route):**
```javascript
const {isAllowed} = require('../middlewares/authentication');
//...
app.get('/protectedRoute', isAllowed, Controller.method);
//...
```
to improve it, define a lvl politic on roles ex:
- 1 : super admin
- 2 : admin
- 3 : moderator
- etc.

set the lvl in the payload and check if the lvl of the user is less or equal than the lvl allowed


## mysql
### basic (branch "mysql")
./library/Mysql.js

create a new model (you duplicate users.model.js)
```javascript
const Mysql = require('../library/Mysql');
const db = require('../datasources/mysql');
const table = 'my_table';
const fields = ['id', 'title', 'created_at'];
class MyModel extends Mysql {
    constructor(db, table, fields) {
        super(db, table, fields);   
    }

    //add custom methods below
}

module.exports = new MyModel(db, table, fields);
```
You will now have access to Mysql class methods :
```javascript
const MyModel = require('../models/my-model.model');
MyModel.create(); 
MyModel.read();
MyModel.update();
MyModel.delete();
```


and custom methods if you add them in the model

#### Usage examples :
**Mysql.create**
```javascript
const MyModel = require('../models/my-model.model');
MyModel.create(data, (err, results) => {}); 
MyModel.read(where, limits,(err, results) => {});
MyModel.update(where, data, (err, results) => {});
MyModel.delete(where, (err, results) => {});
```


### async (branch "mysql-async")
./library/Mysql.js

### typetron (branch "mysql-typetron")

## logger
./library/logger.js

## config   
./config/

    
<a name="todo"></a>
# TODO
- add swagger
- add tests mocha + chai
- add models generator
- add controller parent like mysql
<a name="changelog"></a>
# Changelog

