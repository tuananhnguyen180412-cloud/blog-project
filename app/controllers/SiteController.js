const Blog = require('../models/Blog');

class SiteController {
    // [GET] /
    async index(req, res, next) {
        try {
            const blogs = await Blog.find({}).lean();
            res.render('home', { blogs });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /search
    async search(req, res, next) {
        try {
            const query = req.query.q || '';
            let blogs = [];

            if (query) {
                blogs = await Blog.find({
                    title: { $regex: query, $options: 'i' }
                }).lean();
            }

            res.render('search', { blogs, query });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /about
    about(req, res) {
        res.render('about');
    }

    // [GET] /contact
    contact(req, res) {
        res.render('contact');
    }

    // [POST] /contact
    handleContact(req, res) {
        console.log('Dữ liệu liên hệ:', req.body);
        res.redirect('/contact');
    }

    // [GET] /login
    login(req, res) {
        res.render('login');
    }

    // [POST] /login
    handleLogin(req, res) {
        console.log('Dữ liệu đăng nhập:', req.body);
        res.redirect('/');
    }

    // [GET] /register
    register(req, res) {
        res.render('register');
    }

    // [POST] /register
    handleRegister(req, res) {
        console.log('Dữ liệu đăng ký:', req.body);
        res.redirect('/login');
    }

    // [GET] /logout - Bổ sung xử lý Đăng xuất
    logout(req, res) {
        // Xóa cookie hoặc hủy session tại đây nếu có
        // res.clearCookie('token'); 
        
        // Chuyển hướng về trang đăng nhập hoặc trang chủ
        res.redirect('/login');
    }
}

module.exports = new SiteController();