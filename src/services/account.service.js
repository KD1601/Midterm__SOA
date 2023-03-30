// Define your services here
const repo = require('../repositories/account.repository')

async function handleLogin(username,password) {
    try {
        if(await repo.handleLogin(username,password)) {
            console.log("login success")
            window.location.href = '/'
        } else {
            console.log("login failed")
        }
    } catch (err) {
        throw new Error('Service: Something wrong');
    }
}

module.exports = {
    handleLogin
}
