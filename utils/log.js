/**
 *
 * @param obj
 * @param title
 */
function log(obj, title = null) {
    if (title) console.log(title, obj);
    else console.log(obj)
}

module.exports = log;
