// const mysql = require("mysql");
const mysql = require("mysql2");//mysql2 필요.
const dbConfig = require("../config/db.config.js");

// 데이터베이스 connection 객체 생성
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.database,
    port: dbConfig.port
});

function create_User_TABLE()
{
    connection.query('SHOW TABLES', function (err, result) {
        if (err) throw err;  
        console.log("테이블임."+result);
        console.log(result);
      });

    if(!true)
    connection.query('DROP TABLES customers', function (err, result) {
        console.log(result);
      });


    console.log("Connected!");
    if(!true)
    {
        // var sql = `CREATE TABLE customers
        var sql = `CREATE TABLE IF NOT EXISTS customers 
        (id INT AUTO_INCREMENT PRIMARY KEY, 
            firstname VARCHAR(50) NOT NULL, 
        lastname VARCHAR(50) NOT NULL,phone VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL)`;
        connection.query(sql, function (err, result) {
        if (err) throw err;  
        console.log("Table created");
        });
    }
    if(!true)
    {
        connection.query(`ALTER TABLE customers MODIFY COLUMN firstname varchar(51) NULL;`,
        // connection.query(`ALTER TABLE customers MODIFY COLUMN firstname firstname varchar(51) NULL;`,
         function (err, result) {
        if (err) throw err;  
        console.log("ALTER TABLE end.");
        });
    }
}
// MySQL connection 실행
connection.connect(error=>{
    if(error) throw error;
    console.log("Successfully connected to the database. ");
    create_User_TABLE();
})  
  
      

module.exports = connection;