var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host:"l23.57.80.190",
        port:"3306",
        user:"root",
        database:"my_blog",
        password:"980820"
    });
    return connection;

}

module.exports.createConnection = createConnection;