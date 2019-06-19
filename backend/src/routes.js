const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

//controlles
const PostController = require('./controllers/PostControllers');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

//rota para da likes
routes.post('/posts/:id/like', LikeController.store);


module.exports = routes;