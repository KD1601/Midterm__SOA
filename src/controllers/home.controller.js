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
        const foods = await homeServices.getFoodList();
        res.render('home', { data: foods });
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function completeOrder(req, res, next) {
    try {
        // const foods = await homeServices.getFoodList();
        // console.log(req.body)
        // console.log(req.session.maban)
        // console.log(req.session.manv)
        const moment = require('moment-timezone');
        const currentTime = moment().tz('Asia/Ho_Chi_Minh');
        const formattedTimeDay = currentTime.format('YYYY-MM-DD');

        const donhang = {
            madonhang: generateRandomCode(),
            maban: req.session.maban,
            manhanvien: req.session.manv,
            ngaytao: formattedTimeDay,
            thoigianthanhtoan: null,
            trangthai: "Đang xử lý",
            tongtien: req.body.total
        }

        const dataOrder = await homeServices.createOrder(donhang);

        const details = req.body.orderItems
        for (detail in details) {
            console.log(details[detail])
            const mamonan = await homeServices.getMaMonAn(details[detail].name);
            madon = donhang.madonhang;
            soluong = details[detail].quantity;
            ghichu = details[detail].note;

            const dataDetail = await homeServices.createDetailOrder(mamonan, madon, soluong, ghichu);
        }

        res.end('create order complete');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function getListTable(req, res, next) {
    try {
        const tables = await homeServices.getTables()
        res.render('choose_table', { tables, id: req.params.id });
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
                const promises = cacMaMonAn.map(async(element) => {
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

var generatedCodes = [];

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 10;
    let code = '';

    do {
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
    } while (generatedCodes.includes(code));

    generatedCodes.push(code);
    return code;
}

async function handleCloseTableEnd(req, res, next) {
    try {
        const maban = req.body.tableId
        const manv = req.body.employeeId
        const result = await homeServices.getCloseTable(maban)
        const billCode = await homeServices.getBill(maban)
        let randomCode = generateRandomCode();
        const moment = require('moment-timezone');
        const currentTime = moment().tz('Asia/Ho_Chi_Minh');
        const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
        const bill = await homeServices.createBill(randomCode, billCode[0].madonhang, manv, formattedTime)
        req.session.flash = {
            message: `Phiếu tính tiền ${randomCode} đã được tạo thành công vào lúc ${formattedTime}`,
        }
        res.redirect('/close-table')
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function handleOpenTable(req, res, next) {
    try {
        const maban = req.body.tableId
        const manv = req.params.id
        req.session.maban = maban
        req.session.manv = manv
        const result = await homeServices.getOpenTable(maban)
        if (result > 0) {
            res.redirect('/home')
        }

    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

module.exports = {
    index,
    getListTable,
    getListEndTable,
    handleCloseTable,
    handleCloseTableEnd,
    handleOpenTable,
    home,
    completeOrder,
};