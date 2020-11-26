class Mysql {
    /**
     *
     * @param db
     * @param table
     * @param fields
     */
    constructor(db, table, fields) {
        this.db = db;
        this.table = table;
        this.fields = fields.join(',');
    }


    /**
     *
     * @param data
     * @param next
     * @returns {Promise<void>}
     */
    create(data = {}, next) {
        this.db.query(`INSERT INTO ${this.table} SET ?`, data, next);
    }

    /**
     *
     * @param wheres
     * @param limits ex: [10] => LIMIT 10 - [0,10] => LIMIT 0,10 (0 = offset, 10 = limit)
     * @param next
     * @returns {Promise<void>}
     */
    read(wheres = {}, limits = [],next) {
        let limit = this.buildLimits(limits);
        let where = this.buildWhere(wheres);
        this.db.query(`SELECT ${this.fields} FROM ${this.table} ${where} ${limit}`, where, next);
    }

    /**
     *
     * @param wheres
     * @param data
     * @param next
     * @returns {Promise<void>}
     */
    update(wheres = {}, data = {}, next) {
        let where = this.buildWhere(wheres);
        this.db.query(`UPDATE ${this.table} SET ? ${where} ?`, [data, where], next);
    }

    /**
     *
     * @param wheres
     * @param data
     * @param next
     * @returns {Promise<void>}
     */
    delete(wheres = {}, data = {}, next) {
        let where = this.buildWhere(wheres);
        this.db.query(`DELETE FROM ${this.table} ${where} ?`, where, next);
    }

    /**
     * TODO: improve this method
     * @param where
     * @returns {string}
     */
    buildWhere = where => {
        let WHERE = '';
        if (where.length > 0) {
            WHERE += 'WHERE ?';
            //where.forEach(elem => {});
        }
        return WHERE;
    }

    /**
     * @param limits
     * @returns {string}
     */
    buildLimits = (limits = '') => {
        let limit = '';
        if (limits !== '') {
            limit = 'LIMIT ' + limits;
        }
        return limit;
    }
}

module.exports = Mysql;
