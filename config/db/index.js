const mongoose = require('mongoose');

async function connect() {
    try {
        // Ưu tiên lấy biến MONGODB_URI từ Render, nếu chạy ở máy nhà sẽ dùng localhost
        const dbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog_education_dev';
        
        await mongoose.connect(dbUrl);
        console.log('✅ Kết nối Database thành công!');
    } catch (error) {
        console.log('❌ Kết nối Database thất bại!');
        console.log(error);
    }
}

module.exports = { connect };