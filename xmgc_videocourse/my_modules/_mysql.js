/**
 * Created by yyl15 on 2016/9/6.
 */
/**
 * Created by 13275 on 2016/9/2.
 */

var _mysql ={};

var conn =_mysql.conn = $mysql.createConnection({
    host:"115.159.142.157",
    user:"user1",
    password:"Abc!@#123",
    database:"xmgc_coursedb"
});
conn.connect();

module.exports = _mysql;

