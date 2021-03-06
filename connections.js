var mysql = require("mysql");
var util = require('util');
var updates = require("./index");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",
 
  // Your password
  password: "",
  database: "EmployeeTracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // connection.end();
});

connection.query = util.promisify(connection.query)

module.exports = connection;