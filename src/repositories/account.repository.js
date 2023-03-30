const dbClient = require('./db_client');

async function handleLogin(username,password) {
    const record = await dbClient.query(
        `SELECT * FROM taikhoan WHERE tendangnhap = ? && matkhau = ?`,
        [username, password]
    );
    return record;
};

async function getTables() {
    const record = await dbClient.query(
        `SELECT * FROM ban `
    );
    return record;
};


module.exports = {
    handleLogin,getTables,
}