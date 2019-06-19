const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
// yarn add sharp permite a manipulação de imagem

module.exports = {

    async index(req, res) {
        const post = await Post.find().sort('-createdAt');
        return res.json(post);
    },

    async store(req, res) {
        //destruração uma funcionalidade do javascript s6.
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        //salvando a img com jpeg
        const [name] = image.split('.');
        const fileName = `${name}.jpg`

        //tratando a imagem para um novo tamanho.
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        //excluido a a imagem que fico sava no upload.
        fs.unlinkSync(req.file.path);

        //salvando o nome da img no banco.
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post);

        return res.json(post);
    }
};