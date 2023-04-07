const managerServices = require('../services/manager.service')
const homeServices = require('../services/home.service')
async function index(req, res, next) {
    try {
        res.render('manager-main', { id: req.params.id })
    } catch (err) {
        console.error('An error when direct to manager-main page', err.message);
        next(err);
    }
}

async function toHandleSumBillPage(req, res, next) {
    try {
        const response = await fetch(`http://localhost:3000/manager/api/sum-bill`);
        const data = await response.json();
        console.log(data)
        res.render('manager-sum-bill', { bills: data })
    } catch (err) {
        console.error('An error when direct to manager-sum-bill page', err.message);
        next(err);
    }
}
async function toHandleSumBillPageAPI(req, res, next) {
    try {
        var ct = new Date()
        var year = ct.getFullYear()
        var month = ct.getMonth() + 1
        var day = ct.getDate()
        var time
        if (month < 10) {
            time = year + '-0' + month + '-' + day + ' 00:00:00'
        } else {
            time = year + '-' + month + '-' + day + ' 00:00:00'
        }
        listDay = await managerServices.getBillsSelected(time)

        var arrPrice = [];
        if (listDay[0].madonhang) {
            for (let i = 0; i < listDay.length; i++) {
                const billdetails = await homeServices.getBillM(listDay[i].madonhang)
                arrPrice.push(billdetails[0].tongtien)
            }

            for (let i = 0; i < listDay.length; i++) {
                const bill = listDay[i];
                const total = arrPrice[i];
                bill.tongtien = total;
            }
            return res.json(listDay)
        }
    } catch (err) {
        console.error('An error when direct to manager-sum-bill page', err.message);
        next(err);
    }
}

async function toHandleBillHistoryPage(req, res, next) {
    try {
        const response = await fetch(`http://localhost:3000/manager/api/bill-history`)
        const data = await response.json();
        res.render('manager-bill-history', {
            bills: data
        })

    } catch (err) {
        console.error('An error when direct to manager-bill-history page', err.message);
        next(err);
    }
}
async function toHandleBillHistoryPageAPI(req, res, next) {
    try {
        const bills = await managerServices.getBills()
        var arrPrice = [];
        if (bills[0].madonhang) {
            for (let i = 0; i < bills.length; i++) {
                const billdetails = await homeServices.getBillM(bills[i].madonhang)
                arrPrice.push(billdetails[0].tongtien)
            }

            for (let i = 0; i < bills.length; i++) {
                const bill = bills[i];
                const total = arrPrice[i];
                bill.tongtien = total;
            }
        }
        return res.json(bills)
    } catch (err) {
        console.error('An error when direct to manager-bill-history page', err.message);
        next(err);
    }
}

async function toSelectYear(req, res, next) {
    try {
        // console.log(req.body)
        const response = await fetch(`http://localhost:3000/manager/api/bill-history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.render('manager-bill-history', { bills: data })
    } catch (err) {
        console.error('An error when direct to manager-main page', err.message);
        next(err);
    }
}
async function toSelectYearAPI(req, res, next) {
    try {
        const { year, month, day } = req.body
        var listYear = {}
        if (month === undefined) {
            let time = year + '-01-01 00:00:00'
            listYear = await managerServices.getBillsSelected(time)
        } else if (day == undefined) {
            var time
            if (month < 10) {
                time = year + '-0' + month + '-01 00:00:00'
            } else {
                time = year + '-' + month + '-01 00:00:00'
            }
            listYear = await managerServices.getBillsSelected(time)
        } else {
            var time
            if (month < 10) {
                time = year + '-0' + month + '-' + day + ' 00:00:00'
            } else {
                time = year + '-' + month + '-' + day + ' 00:00:00'
            }
            listYear = await managerServices.getBillsSelected(time)
        }
        var arrPrice = [];
        if (listYear[0].madonhang) {
            for (let i = 0; i < listYear.length; i++) {
                const billdetails = await homeServices.getBillM(listYear[i].madonhang)
                arrPrice.push(billdetails[0].tongtien)
            }

            for (let i = 0; i < listYear.length; i++) {
                const bill = listYear[i];
                const total = arrPrice[i];
                bill.tongtien = total;
            }
            // console.log(listYear)
        }
        return res.json(listYear);
    } catch (err) {
        console.error('An error when direct to manager-main page', err.message);
        next(err);
    }
}

async function toHandleDetailOfBillPage(req, res, next) {
    try {
        const response = await fetch(`http://localhost:3000/manager/api/detail-order/${req.params.id}`);
        const data = await response.json();
        res.render('detail-order', {
            data: data
        })
    } catch (err) {
        console.error('An error when direct to detail-order page', err.message);
        next(err);
    }
}
async function toHandleDetailOfBillPageAPI(req, res, next) {
    try {
        if (req.params.id) {
            const detail = await homeServices.getBillDetail(req.params.id)
            const cacMaMonAn = detail.map(item => item.mamonan);
            async function getFoods(callback) {
                const promises = cacMaMonAn.map(async(element) => {
                    let food = await homeServices.getFood(element);
                    return food;
                });
                arrFood = await Promise.all(promises);
                callback(arrFood);
            }

            getFoods((arrFood) => {
                arrFood.flat().forEach(item2 => {
                    const item1 = detail.find(item1 => item1.mamonan === item2.mamonan);
                    if (item1) {
                        item2.soluong = item1.soluong;
                        item2.ghichu = item1.ghichu;
                    }
                });
                const arr = arrFood.flat()
                    // console.log(arr)
                return res.json(arr);
            });
        }
    } catch (err) {
        console.error('An error when direct to detail-order page', err.message);
        next(err);
    }
}

module.exports = {
    index,
    toHandleSumBillPage,
    toHandleBillHistoryPage,
    toHandleDetailOfBillPage,
    toSelectYear,
    toHandleSumBillPageAPI,
    toHandleBillHistoryPageAPI,
    toSelectYearAPI,
    toHandleDetailOfBillPageAPI
};