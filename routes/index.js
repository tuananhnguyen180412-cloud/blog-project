const blogsRouter = require('./blogs');
const siteRouter = require('./site');
const meRouter = require('./me'); // 1. Thêm dòng này

function route(app) {
    app.use('/blogs', blogsRouter);
    app.use('/me', meRouter);     // 2. Thêm dòng này
    app.use('/', siteRouter);
}

module.exports = route;