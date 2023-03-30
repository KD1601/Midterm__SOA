const dbClient = require('./db_client');

async function handleLogin(username,password) {
    const record = await dbClient.query(
        `SELECT * from taikhoan where username = "?" && password = "?"`, [username, password]
    );

    return record;
};


module.exports = {
    handleLogin
}