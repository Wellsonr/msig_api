const mysql = require('mysql');

const dbhost = '153.92.15.1'
const dbuser = 'u118184673_UN'
const dbpassword = '63B6Xue8!I'
const dbname = 'u118184673_DB'

module.exports = () => {
    return {
        myconn: mysql.createConnection({
            host: dbhost || '153.92.15.21',
            user: dbuser || 'u563196813_UN',
            password: dbpassword || '#VPuWv6&',
            database: dbname || 'u563196813_DB',
            timezone: "Z+7",
            multipleStatements: true,
            connectTimeout: 60000
        })
    };
};
