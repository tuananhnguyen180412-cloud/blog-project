const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

// 1. Route tạo bài viết (Phải đặt trên cùng)
router.get('/create', blogController.create);
router.post('/store', blogController.store);

// 2. Route chỉnh sửa & xóa bài viết
router.get('/:id/edit', blogController.edit);
router.put('/:id', blogController.update);
router.delete('/:id', blogController.destroy);

// 3. Route xem chi tiết bài viết (ĐỔI :slug THÀNH :id)
router.get('/:id', blogController.show);

module.exports = router;