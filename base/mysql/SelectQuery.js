
var getPool = require('./ConnectionPool');
//Mysql接続コネクションプール


function selectQuery(query, params, callback) {
    var paramList = [];
    if (params != null){
      for (var i = 0; i < params.length; i++) {
          paramList.push(params[i]);
      }  
    }

    getPool().getConnection(function(err, connection) {
        if (err) {
            connection.release();
            res.json({
                "code": 100,
                "status": "Error in connection database"
            });
            return;
        }

        console.log('connect as id ' + connection.threadId);

        connection.query(query, function(err, rows) {
            connection.release();
            if (!err) {
                callback(null, rows);
                return;
            }
            throw err;
        });

        connection.on('error', function(err) {
            res.json({
                "code": 100,
                "status": "Error in connection database"
            });
            return;
        })

    });
}

module.exports = selectQuery;
