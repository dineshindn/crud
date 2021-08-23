const sql = require("mysql");
const dbConfig = require("./db.config");

const pool = sql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});
 
// connection for mysql 
// pool.query('SELECT * FROM Users', (err,rows) => {
//   if(err) throw err;

//   console.log('Data received from Db:');
//   console.log(rows);
// });



module.exports = async (sql, args) => {
  try {
    const result = await pool.query(sql, args);
    return result[0];
  } catch (e) {
    console.log(e);
  } 
};
