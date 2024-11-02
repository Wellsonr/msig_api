var mysql = require('mysql');
var db = mysql.createPool({
    host: process.env.dbhost || 'homansystem.com',
    user: process.env.dbuser || 'homansys_root',
    password: process.env.dbpwd || 'indonesiaraya',
    database: process.env.dbname || 'homansys_homanreport',
    timezone: 'Z+7',
    multipleStatements: true,
});
module.exports = db;
