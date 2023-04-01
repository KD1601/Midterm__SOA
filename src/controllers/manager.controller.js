const managerServices = require('../services/manager.service')
const homeServices = require('../services/home.service')
async function index(req, res, next) {
    try {
        res.render('manager-main')
    } catch (err) {
        console.error('An error when direct to manager-main page', err.message);
        next(err);
    }
}

async function toHandleSumBillPage(req, res, next) {
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

            res.render('manager-sum-bill', {
                bills: bills
            })
        }


    } catch (err) {
        console.error('An error when direct to manager-sum-bill page', err.message);
        next(err);
    }
}

async function toHandleBillHistoryPage(req, res, next) {
    try {
        res.render('manager-bill-history')
    } catch (err) {
        console.error('An error when direct to manager-bill-history page', err.message);
        next(err);
    }
}

async function toHandleDetailOfBillPage(req, res, next) {
    try {
        if (req.params.id == "DH0101") {
            res.render('detail-order', { id: req.params.id });
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
    toHandleDetailOfBillPage
};