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

    query(...args) {
        return new Promise((resolve, reject) => {
            this.db.query(...args, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    /**
     *
     * @param data
     * @param next
     * @returns {Promise<void>}
     */
    async create(data = {}) {
        return this.query(`INSERT INTO ${this.table} SET ?`, data);
    }

    /**
     *
     * @param wheres
     * @param limits ex: [10] => LIMIT 10 - [0,10] => LIMIT 0,10 (0 = offset, 10 = limit)
     * @returns {Promise<void>}
     */
    async read(wheres = {}, limits = []) {
        let limit = this.buildLimits(limits);
        let where = this.buildWhere(wheres);
        return this.query(`SELECT ${this.fields} FROM ${this.table} ${where} ${limit}`, where);
    }

    /**
     *
     * @param wheres
     * @param data
     * @returns {Promise<void>}
     */
    async update(wheres = {}, data = {}) {
        let where = this.buildWhere(wheres);
        return this.query(`UPDATE ${this.table} SET ? ${where}`, [data, where]);
    }

    /**
     *
     * @param wheres
     * @param data
     * @returns {Promise<void>}
     */
    async delete(wheres = {}, data = {}) {
        let where = this.buildWhere(wheres);
        return this.query(`DELETE FROM ${this.table} ${where} ?`, where);
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
     * @param limits ex: [10] => LIMIT 10 - [0,10] => LIMIT 0,10 (0 = offset, 10 = limit)
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
