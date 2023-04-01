const dbClient = require('./db_client');

async function getBills() {
    const record = await dbClient.query(
        `SELECT * FROM phieutinhtien`
    );
    return record;
};

async function getBillsSelected(year) {
    console.log(year)
    const record = await dbClient.query(
        `SELECT * FROM phieutinhtien where ngaytao >= ?`, [year]
    );
    return record;
};




module.exports = {
    getBills,getBillsSelected
}