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
        res.render('manager-sum-bill')
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