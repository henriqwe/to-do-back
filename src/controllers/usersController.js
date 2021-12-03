const User = require('../models/User');
const { hash } = require('bcryptjs');

const redirect = async(req, res, next) => {
    let title = req.params.title;

    try {
        let doc = await User.findOneAndUpdate({ title }, { $inc: { click: 1 } });
        //db.links.update({title: 'title'},{$inc:{click: 1}})
        if (doc) {
            res.redirect(doc.url);
        } else {
            next();
        }
    } catch (error) {
        res.send('houve um erro no redirecionamento', error);
    }
}

const addUser = async(req, res) => {
    try {
        let { nome, email, senha } = req.body;

        let hashedSenha = await hash(senha, 10)

        User.create({ nome, email, senha: hashedSenha }).then(response => {
            res.redirect('/');
        }).catch(erro => {
            res.send(erro.errors[0].message)
        })

    } catch (error) {
        res.send('houve um erro no cadastro')
    }
}

const editUser = async(req, res) => {
    try {
        let docs = await User.find({});
        //db.links.find({})
        res.render('all', { links: docs });
    } catch (error) {
        res.send('houve um erro em allLinks', error)
    }
}

const deleteUser = async(req, res) => {

    let id = req.params.id;

    if (!id) {
        id = req.body.id;
    }
    try {
        await User.findByIdAndDelete(id);
        //db.links.remove({_id: ObjectId("id")})
        res.redirect('/')
    } catch (error) {
        res.send('houve um erro ao deletar um User', error)
    }
}

const userAuth = async(req, res) => {

    try {
        let { email, senha } = req.body;
        User.findOne({ where: { email, senha } }).then((user) => {
            if (user) {
                res.send(user)
            } else {
                res.status(401).send('Email/Senha inválido')
            }
        })
    } catch (error) {
        res.status(404).send(error);
    }
}

const getAllUsers = async(req, res) => {

    try {
        User.findAll().then(users => {
            res.send(users);
        });
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = { getAllUsers, userAuth, addUser };