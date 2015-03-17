var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 30,
    host: 'hogehoge',
    user: 'root',
    password: 'root',
    database: 'ccm',
    debug: false
});

function getPool(){
	return pool
}

module.exports = getPool;