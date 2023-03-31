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
        `SELECT * FROM ban`
    );
    return record;
};

async function getEndTables() {
    const record = await dbClient.query(
        `SELECT * FROM ban where trangthai = "mo"`
    );
    return record;
};

async function getCloseTable(maban) {
    const record = await dbClient.query(
        `UPDATE ban SET trangthai = 'dong' WHERE maban = ?`,[maban]
    );
    return record.changedRows;
};

async function getOpenTable(maban) {
    console.log(maban)
    const record = await dbClient.query(
        `UPDATE ban SET trangthai = 'mo' WHERE maban = ?`,[maban]
    );
    return record.changedRows;
};

async function getBill(maban) {
    const record = await dbClient.query(
        `SELECT * FROM donhang where maban = ?`,[maban]
    );
    return record;
};

async function getBillDetail(madonhang) {
    const record = await dbClient.query(
        `SELECT * FROM chitietdonhang where madonhang = ?`,[madonhang]
    );
    return record;
};

async function getFood(mamonan) {
    const record = await dbClient.query(
        `SELECT * FROM monan where mamonan = ?`,[mamonan]
    );
    return record;
};



module.exports = {
    handleLogin,getTables,getEndTables,getCloseTable,getBill,getBillDetail,getFood, getOpenTable
}