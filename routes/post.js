const express = require('express')
const routes = express.Router();
const postcontroller = require('../controllers/postcontroller')
const post = require('../models/postmodel')

console.log('post routing');

routes.get('/',postcontroller.add_post)

routes.post('/addPostDetail',post.uploadedPostImg,postcontroller.addPostDetail)

routes.get('/view_post',postcontroller.view_post)

routes.get('/DeletePost/:postId',postcontroller.DeletePost)

routes.get('/UpdatePost/:postId',postcontroller.UpdatePost)

routes.post('/EditPostDetail',postcontroller.EditPostDetail)

module.exports = routes