require('dotenv').config(); // THÊM DÒNG NÀY Ở DÒNG ĐẦU TIÊN
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 3000;

// Nạp cấu hình Database
const db = require('./config/db');

// Thực thi kết nối CSDL
db.connect();

// 1. HTTP logger middleware
app.use(morgan('dev'));

// 2. Cấu hình Static Files
app.use(express.static(path.join(__dirname, 'src', 'public')));

// 3. Middleware xử lý dữ liệu từ Form (POST), JSON và Override HTTP Method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// 4. Cấu hình Template Engine (Handlebars) + Helper dateFormat
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      dateFormat: (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('vi-VN');
      },
    },
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'view'));

// 5. Nạp các tuyến đường
const route = require('./routes');
route(app);

// 6. Khởi chạy server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});