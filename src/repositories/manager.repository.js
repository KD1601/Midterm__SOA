const dbClient = require('./db_client');

async function getBills() {
    const record = await dbClient.query(
        `SELECT * FROM phieutinhtien`
    );
    return record;
};



module.exports = {
    getBills,
}