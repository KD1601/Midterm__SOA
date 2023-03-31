// Define your controllers here
const kitchenServices = require('../services/kitchen.service')

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
        const orders = await kitchenServices.getOrders()
        res.render('kitchen-order', { data: orders })
    } catch (err) {
        console.error('An error when direct to kitchen-order page', err.message);
        next(err);
    }
}

async function toHandleDetailOrderPage(req, res, next) {
    try {
        const order = await kitchenServices.getOrder(req.params.id)
        const data = []
        for (let x in order) {
            const foodName = await kitchenServices.getFoodName(order[x].mamonan)
            data.push({
                tenmonan: foodName,
                soluong: order[x].soluong,
                ghichu: order[x].ghichu
            })
        }
        console.log(data)
            // const food = await kitchenServices.getFoodName('LAU01')
            // console.log(food)
        res.render('kitchen-detail-order', { data: data, id: req.params.id })
    } catch (err) {
        console.error('An error when direct to kitchen-order page', err.message);
        next(err);
    }
}

async function toHandleFoodPage(req, res, next) {
    try {
        const foods = await kitchenServices.getFoods()
        res.render('kitchen-food', { data: foods })
    } catch (err) {
        console.error('An error when direct to kitchen-food page', err.message);
        next(err);
    }
}

async function changeFoodStatus(req, res, next) {
    try {
        const change = await kitchenServices.changeStatus(req.body.mamonan, req.body.trangthai)
        res.render('kitchen-food')
    } catch (err) {
        console.error('An error when direct to kitchen-food page', err.message);
        next(err);
    }
}

async function completeOrder(req, res, next) {
    try {
        console.log(req.body)
        const change = await kitchenServices.completeOrder(req.body.madonhang, "Đã xử lý")
        res.render('kitchen-food')
    } catch (err) {
        console.error('An error when direct to kitchen-food page', err.message);
        next(err);
    }
}

module.exports = {
    index,
    toHandleOrderPage,
    toHandleDetailOrderPage,
    toHandleFoodPage,
    changeFoodStatus,
    completeOrder
};