var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bamazon"
  });

  module.exports = con;