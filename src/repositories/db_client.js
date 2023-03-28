var mysql = require('mysql2/promise');
var dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'file_management'
};

async function query(sql, params) {
  var con = await mysql.createConnection(dbConfig);
  const [results, ] = await con.execute(sql, params);

  return results;
}

module.exports = {
  query
}