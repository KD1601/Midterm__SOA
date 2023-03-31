// Define your services here
const repo = require('../repositories/home.repository')

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

async function getEndTables() {
    try {
        var listTable = await repo.getEndTables()
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

async function getCloseTable(maban) {
    try {
        var result = await repo.getCloseTable(maban)
        return result
    } catch (err) {
        console.log(err);
        throw new Error('Service: Something wrong');
    }
}

async function getOpenTable(maban) {
    try {
        var result = await repo.getOpenTable(maban)
        return result
    } catch (err) {
        console.log(err);
        throw new Error('Service: Something wrong');
    }
}

async function getBill(maban) {
    try {
        var results = await repo.getBill(maban)
        return results
    } catch (err) {
        console.log(err);
        throw new Error('Service: Something wrong');
    }
}

async function getBillDetail(madonhang) {
    try {
        var results = await repo.getBillDetail(madonhang)
        return results
    } catch (err) {
        console.log(err);
        throw new Error('Service: Something wrong');
    }
}

async function getFood(mamonan) {
    try {
        var results = await repo.getFood(mamonan)
        return results
    } catch (err) {
        console.log(err);
        throw new Error('Service: Something wrong');
    }
}

module.exports = {
    handleLogin,getTables,getEndTables,getCloseTable,getBill,getBillDetail,getFood, getOpenTable
}
