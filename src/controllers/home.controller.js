// Define your controllers here
const homeServices = require('../services/home.service')


async function index(req, res, next) {
    try {
        res.render('options');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function home(req, res, next) {
    try {
        res.render('home');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function getListTable(req, res, next) {
    try {
        const tables = await homeServices.getTables()
        res.render('choose_table', { tables });
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function getListEndTable(req, res, next) {
    try {
        const tables = await homeServices.getEndTables()
        res.render('choose_endTable', { tables });
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
        const { username, password } = req.body
        const select = await homeServices.handleLogin(username, password)
        if (select) {
            if (select.startsWith("B")) {
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

async function handleCloseTable(req, res, next) {
    try {
        const maban = req.body.tableId
        // const result = await homeServices.getCloseTable(maban)
        const bill = await homeServices.getBill(maban)
        var arrFood = [];
        if (bill[0].madonhang) {
            var billdetails = await homeServices.getBillDetail(bill[0].madonhang)
            const cacMaMonAn = billdetails.map(item => item.mamonan);
            async function getFoods(callback) {
                const promises = cacMaMonAn.map(async (element) => {
                    let food = await homeServices.getFood(element);
                    return food;
                });
                arrFood = await Promise.all(promises);
                callback(arrFood);
            }

            getFoods((arrFood) => {

                arrFood.flat().forEach(item2 => {
                    const item1 = billdetails.find(item1 => item1.mamonan === item2.mamonan);
                    if (item1) {
                        item2.soluong = item1.soluong;
                    }
                });
                const arr = arrFood.flat()
                res.render('choose_endTable', { foods: arr, maban: maban })
            });
        }
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function handleCloseTableEnd(req, res, next) {
    try {
        const maban = req.body.tableId
        const result = await homeServices.getCloseTable(maban)
        res.redirect('/close-table')
        
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function handleOpenTable(req, res, next) {
    try {
        const maban = req.body.tableId
        console.log(maban)
        const result = await homeServices.getOpenTable(maban)
        if(result >0) {
            res.redirect('/home')
        }
        
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

module.exports = {
    index, login, handleLogin, getListTable, getListEndTable, handleCloseTable,handleCloseTableEnd,handleOpenTable,
    home,
};