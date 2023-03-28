// Define your controllers here

async function get(req, res, next) {
    try {
        res.json({ success: 'okay' });
    } catch (err) {
        console.error('An error occurred when getting a file', err.message);
        next(err);
    }
}

module.exports = {
    get,
};