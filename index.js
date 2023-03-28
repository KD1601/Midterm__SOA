const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./src/routes');
const handlebars = require('express-handlebars');
const path = require('path');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.engine(
  'hbs',
  handlebars.engine({
      extname: '.hbs',
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));


app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/', router);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`)
});