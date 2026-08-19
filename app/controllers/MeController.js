const Blog = require('../models/Blog');

class MeController {
    // [GET] /me/stored/blogs
    async storedBlogs(req, res, next) {
        try {
            const blogs = await Blog.find({}).lean();
            
            // Đã đổi từ 'me/stored-blogs' thành 'stored-blogs'
            res.render('stored-blogs', { blogs });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MeController();