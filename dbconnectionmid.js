const mysql = require('mysql');

const dbhost = '153.92.15.1'
const dbuser = 'u118184673_UN'
const dbpassword = '63B6Xue8!I'
const dbname = 'u118184673_DB'

module.exports = () => {
    return {
        myconn: mysql.createConnection({
            host: dbhost,
            user: dbuser,
            password: dbpassword,
            database: dbname,
            timezone: "Z+7",
            multipleStatements: true,
            connectTimeout: 60000
        })
    };
};
