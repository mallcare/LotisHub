const express = require('express');
const env = require("dotenv").config();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}


retcode = require('./modules/retcode');
config = require('./config/config');



const index = require('./routes/index');
const registerUsersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const clientRouter = require("./routes/clients");
const itemsRouter = require("./routes/items");
const ordersRouter = require("./routes/orders");
const excelMatchRouter = require("./routes/excel_matching");

const db = require("./models/index");


// Routes
//app.use('/', index);
app.use('/api/users', registerUsersRouter);
app.use('/api/login', loginRouter);
app.use('/api/clients', clientRouter);
app.use('/api/items', itemsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/excel-match', excelMatchRouter);

// //db.sequelize.sync();


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));


module.exports = app;
