const mysql = require('mysql2/promise');


  const pool = mysql.createPool({
  
    connectionLimit: 10,
    host: 'localhost',
    user: 'ofmaxuk',
    database: 'ofmaxuk',
    password: 'uba',
    port: '8889'
  });
  

  pool.getConnection((err,connection) => {
    if(err){
      console.log('error connecting')
    }
    if(connection) connection.release();
  })


module.exports = pool;