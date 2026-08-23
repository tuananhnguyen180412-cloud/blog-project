const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
    title: { type: String, required: true },
    content: { type: String },
    img: { type: String },
    category: { type: String, default: 'Khác' }, // Bổ sung trường danh mục
}, { 
    timestamps: true // Tự động tạo và quản lý 2 trường createdAt và updatedAt
});

module.exports = mongoose.model('Blog', Blog);