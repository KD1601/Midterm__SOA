const dbClient = require('./db_client');

async function handleLogin(username, password) {
    const record = await dbClient.query(
        `SELECT * FROM accounts WHERE tendangnhap = ? && matkhau = ?`, [username, password]
    );
    return record[0].tendangnhap;
};

async function getTables() {
    const record = await dbClient.query(
        `SELECT * FROM ban`
    );
    return record;
};

async function getEndTables() {
    const record = await dbClient.query(
        `SELECT * FROM ban where trangthai = "Đã có khách"`
    );
    return record;
};

async function getCloseTable(maban) {
    const record = await dbClient.query(
        `UPDATE ban SET trangthai = 'Còn trống' WHERE maban = ?`, [maban]
    );
    return record.changedRows;
};

async function getOpenTable(maban) {
    const record = await dbClient.query(
        `UPDATE ban SET trangthai = 'Đã có khách' WHERE maban = ?`, [maban]
    );
    return record.changedRows;
};

async function getBill(maban) {
    const record = await dbClient.query(
        `SELECT * FROM donhang where maban = ?`, [maban]
    );
    return record;
};

async function getBillDetail(madonhang) {
    const record = await dbClient.query(
        `SELECT * FROM chitietdonhang where madonhang = ?`, [madonhang]
    );
    return record;
};

async function getFood(mamonan) {
    const record = await dbClient.query(
        `SELECT * FROM monan where mamonan = ?`, [mamonan]
    );
    return record;
};

async function createBill(code, madonhang, manv, date) {
    const record = await dbClient.query(
        `INSERT INTO phieutinhtien (maphieu, madonhang, manhanvien, ngaytao) VALUES (?, ?, ?, ?)`,
  [code, madonhang, manv, date]
    );
    console.log(record)
    // return record;
};



module.exports = {
    getTables,
    getEndTables,
    getCloseTable,
    getBill,
    getBillDetail,
    getFood,
    getOpenTable,
    createBill,
}