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

async function homeAPI(req, res, next) {
    try {
        var foods = {}
        if (req.params.filter) {
            foods = await homeServices.getFoodListFilter(req.params.filter);
        } else {
            foods = await homeServices.getFoodList();
        }
        return res.json({ foods });
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function home(req, res, next) {
    try {
        var response = {}
        if (req.params.filter) {
            response = await fetch(`http://localhost:3000/api/home/${req.params.filter}`);
        } else {
            response = await fetch(`http://localhost:3000/api/home/`);
        }

        const data = await response.json();
        res.render('home', { data: data.foods });
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function completeOrder(req, res, next) {
    try {
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
            const mamonan = await homeServices.getMaMonAn(details[detail].name);
            madon = donhang.madonhang;
            soluong = details[detail].quantity;
            ghichu = details[detail].note;

            const dataDetail = await homeServices.createDetailOrder(mamonan, madon, soluong, ghichu);
        }
        req.session.flash = {
            message: `Đơn hàng đã được chuyển đến nhân viên bếp. Cảm ơn quý khách đã gọi món`,
        }
        res.end('create order complete');
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function getListTable(req, res, next) {
    try {
        var response = {}
        response = await fetch(`http://localhost:3000/api/open-table`);
        const tables = await response.json();
        res.render('choose_table', { tables, id: req.params.id });
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function getListTableApi(req, res, next) {
    try {
        const tables = await homeServices.getTables()
        res.json(tables)
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function getListEndTable(req, res, next) {
    try {
        var response = {}
        response = await fetch(`http://localhost:3000/api/close-table`);
        const tables = await response.json();
        res.render('choose_endTable', { tables });
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function getListEndTableApi(req, res, next) {
    try {
        const tables = await homeServices.getEndTables()
        res.json(tables)
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function handleCloseTableAPI(req, res, next) {
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
                res.json({ foods: arr, maban: maban })
            });
        }
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function handleCloseTable(req, res, next) {
    try {
        const maban = req.body.tableId

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tableId: maban })
        };

        var response = {}
        response = await fetch('http://localhost:3000/api/close-table', options);
        const result = await response.json();
        res.render('choose_endTable', { foods: result.foods, maban: result.maban })
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

async function handleCloseTableEndAPI(req, res, next) {
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
        res.json({
            message: "Create bill successfully",
            billStatus: bill,
            billCode: randomCode,
            timeCreated: formattedTime
        })
    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function handleCloseTableEnd(req, res, next) {
    try {
        const maban = req.body.tableId
        const manv = req.body.employeeId
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tableId: maban, employeeId: manv })
        };

        var response = {}
        response = await fetch('http://localhost:3000/api/close-tableEnd', options);
        const result = await response.json();
        if (result.billStatus == 1) {
            req.session.flash = {
                message: `Phiếu tính tiền ${result.billCode} đã được tạo thành công vào lúc ${result.timeCreated}`,
            }
        } else {
            req.session.flash = {
                message: `Tạo phiếu tính tiền ${result.billCode} thất bại`,
            }
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

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                maban: maban,
                manv: manv
            })
        };

        var response = {}
        response = await fetch('http://localhost:3000/api/open-table/:id', options);
        const result = await response.json();
        if (result.result > 0) {
            req.session.flash = {
                message: `Mở bàn ${maban} thành công!`,
            }
        } else {
            req.session.flash = {
                message: `Có lỗi xảy ra khi mở bàn ${maban}!`,
            }
        }

        res.redirect('/home')

    } catch (err) {
        console.error('Error', err.message);
        next(err);
    }
}

async function handleOpenTableAPI(req, res, next) {
    try {
        const maban = req.body.maban
        const manv = req.body.manv
        req.session.maban = maban
        req.session.manv = manv
        const result = await homeServices.getOpenTable(maban)
        const check = result.results

        res.json({ result: check })

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
    homeAPI,
    getListTableApi,
    getListEndTableApi,
    handleOpenTableAPI,
    handleCloseTableAPI,
    handleCloseTableEndAPI,
};