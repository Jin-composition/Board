const mysql = require('mysql');
 
const db = mysql.createPool({
    host : "172.30.1.200",
    user : "root",
    password : "Whgdmstodrkr@&098",
    database : "TEST2"
});
 
module.exports = db;