// Define your services here
const repo = require('../repositories/account.repository')

async function handleLogin(username,password) {
    try {
        var role = await repo.handleLogin(username,password)
        if(role.length > 0) {
            return role[0].id
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
        throw new Error('Service: Something wrong');
    }
}

async function getTables() {
    try {
        var listTable = await repo.getTables()
        if(listTable.length > 0) {
            return listTable
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
        throw new Error('Service: Something wrong');
    }
}

module.exports = {
    handleLogin,getTables
}
