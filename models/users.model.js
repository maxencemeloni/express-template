const Mysql = require('../library/Mysql');
const db = require('../datasources/mysql');
const table = 'users';
const fields = ['id', 'email', 'created_at', 'disabled_at'];
// Avoid to return the password or any sensitive information

// Have a look on /library/Mysql.js
// you will have access to methods Users.create, Users.read, Users.update, Users.delete
class Users extends Mysql {
    constructor(...args) {
        super(...args);
    }
    // Add custom methods below
}

module.exports = new Users(db, table, fields);
