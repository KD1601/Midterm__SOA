// Define your controllers here

async function index(req, res, next) {
    try {
        res.render('home');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

module.exports = {
    index,
};