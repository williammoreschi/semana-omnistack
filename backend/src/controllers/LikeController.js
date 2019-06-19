const Post = require('../models/Post');

module.exports = {
    async store(req, res) {
        //pegando o registro do post para da like
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();

        req.io.emit('like', post);

        return res.json(post);
    }
};