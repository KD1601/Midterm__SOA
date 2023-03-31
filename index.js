const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./src/routes');
const handlebars = require('express-handlebars');
const path = require('path');
const Handlebars = require('handlebars');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


Handlebars.registerHelper('multiply', function(a, b) {
  return a * b;
});

Handlebars.registerHelper('totalPrice', function(foods) {
  var total = foods.reduce(function(sum, food) {
    return sum + (food.gia * food.soluong);
  }, 0);
  return total;
});

Handlebars.registerHelper('formatMoney', function(money) {
  return money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
});


app.engine(
<<<<<<< HEAD
  'hbs',
  handlebars.engine({
      extname: '.hbs',
      helpers: {
        eq: function(status, input) {
          if (status === input) {
            return new Handlebars.SafeString('<button data-id= ' +this.maban + ' class="btn">' + this.maban + '</button>');
          } else {
            return new Handlebars.SafeString('<button class="btn btn-disable" disabled>' + this.maban + '</button>');
          }
=======
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            eq: function(status, input) {
                if (status === input) {
                    return new Handlebars.SafeString('<button class="btn">' + this.maban + '</button>');
                } else {
                    return new Handlebars.SafeString('<button class="btn btn-disable" disabled>' + this.maban + '</button>');
                }
            },
            isEmpty: function(trangthai) {
                if (trangthai == "Đã bán hết") return "";
                else return "checked"
            }
>>>>>>> 2ddec96debe61bbacb9c6b95450f918d73591510
        }
    }),
);



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/', router);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});


app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
});