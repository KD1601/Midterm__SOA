// Define your controllers here

async function index(req, res, next) {
    try {
        res.render('home');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function login(req, res, next) {
    try {
        res.render('login');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function register(req, res, next) {
    try {
        res.render('register');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}
module.exports = {
    index,login,register
};