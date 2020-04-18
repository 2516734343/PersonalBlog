var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host:"bdm72188977.my3w.com",
        // host:"192.168.0.109",
        port:"3306",
        user:"bdm72188977",
        // user:"root",
        database:"bdm72188977_db",
        // database:"my_blog"
        password:"s490806895-+."
    });
    return connection;

}

module.exports.createConnection = createConnection;