const Blog = require('../models/Blog');

class BlogController {
    // [GET] /blogs/create
    create(req, res) {
        res.render('create');
    }

    // [POST] /blogs/store
    async store(req, res, next) {
        try {
            const formData = { ...req.body };

            // Nếu người dùng không nhập link ảnh hoặc nhập link không chuẩn (không bắt đầu bằng http),
            // tự động gán link ảnh mẫu để tránh vỡ giao diện
            if (!formData.img || !formData.img.startsWith('http')) {
                formData.img = 'https://picsum.photos/400/300';
            }

            const blog = new Blog(formData);
            await blog.save();
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    // [GET] /blogs/:id hoặc /blogs/:slug
    async show(req, res, next) {
        try {
            let blog = null;
            // Kiểm tra nếu id là chuỗi ObjectId 24 ký tự hợp lệ
            if (req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                blog = await Blog.findById(req.params.id).lean();
            } else {
                blog = await Blog.findOne({ slug: req.params.id }).lean();
            }

            if (!blog) {
                return res.status(404).send('<h1>404 - Bài viết không tồn tại</h1><a href="/">Về trang chủ</a>');
            }

            res.render('show', { blog });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /blogs/:id/edit
    async edit(req, res, next) {
        try {
            const blog = await Blog.findById(req.params.id).lean();
            res.render('edit', { blog });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /blogs/:id
    async update(req, res, next) {
        try {
            await Blog.updateOne({ _id: req.params.id }, req.body);
            res.redirect('/me/stored/blogs');
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /blogs/:id
    async destroy(req, res, next) {
        try {
            await Blog.deleteOne({ _id: req.params.id });
            res.redirect('/me/stored/blogs');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BlogController();