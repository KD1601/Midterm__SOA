// Define your controllers here

async function index(req, res, next) {
    try {
        res.render('kitchen_main')
    } catch (err) {
        console.error('An error when direct to kitchen-main page', err.message);
        next(err);
    }
}

async function toHandleOrderPage(req, res, next) {
    try {
        res.render('kitchen-order')
    } catch (err) {
        console.error('An error when direct to kitchen-order page', err.message);
        next(err);
    }
}

async function toHandleFoodPage(req, res, next) {
    try {
        res.render('kitchen-food')
    } catch (err) {
        console.error('An error when direct to kitchen-food page', err.message);
        next(err);
    }
}

module.exports = {
    index,toHandleOrderPage,toHandleFoodPage
};