// Define your controllers here
const accountServices = require('../services/account.service')

async function login(req, res, next) {
    try {
        console.log(req.body)
        const {username,  password} = req.body
        accountServices.handleLogin(username,  password)
    } catch (err) {
        console.error('An error when login', err.message);
        next(err);
    }
}


module.exports = {
    login,
};