var mysql = require('mysql2/promise');
var dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'dl_hotpot'
};

async function query(sql, params) {
  var con = await mysql.createConnection(dbConfig);
  console.log(con)
  const [results, ] = await con.execute(sql, params);

  return results;
}

module.exports = {
  query
}