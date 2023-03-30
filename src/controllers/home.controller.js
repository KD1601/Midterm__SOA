// Define your controllers here
const accountServices = require('../services/account.service')


async function index(req, res, next) {
    try {
        res.render('options');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function getListTable(req, res, next) {
    try {
        const tables = await accountServices.getTables()
        res.render('choose_table', { tables});
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


async function handleLogin(req, res, next) {
    try {
        const {username,  password} = req.body
        const select = await accountServices.handleLogin(username,  password)
        if(select) {
            if(select.startsWith("B")) {
                res.render('kitchen_main')
            } else {
                res.render('login')
            }
        } else {
            res.render('login')
        }
    } catch (err) {
        console.error('An error when login', err.message);
        next(err);
    }
}
module.exports = {
    index,login,handleLogin,getListTable,
};