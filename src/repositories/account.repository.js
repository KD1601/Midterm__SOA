const dbClient = require('./db_client');

async function get(id) {
    const record = await dbClient.query(
        `SELECT * FROM accounts WHERE id = ?`,
        [id]
    );

    return record;
};

module.exports = {
    get
}