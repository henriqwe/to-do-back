const User = require('../models/User');
const { hash, compare } = require('bcryptjs');

const findUserById = async(req, res) => {

    try {
        let { id } = req.body;
        User.findOne({ where: { id } }).then((user) => {
            if (user) {
                res.send(user)
            } else {
                res.status(401).send('Usuário não encontrado')
            }
        })
    } catch (error) {
        res.status(404).send(error);
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
        let { nome, senha, email } = req.body;

        let hashedSenha = await hash(senha, 10)

        let user = User.update({ nome, senha: hashedSenha }, { where: { email } })
        res.send(user)

    } catch (error) {
        res.send('houve um erro na edição ---' + error)
    }
}

const deleteUser = async(req, res) => {

    try {
        let { id } = req.body;
        let user = User.destroy({ where: { id } })
        res.send(user)

    } catch (error) {
        res.send('houve um erro na edição ---' + error)
    }
}

const userAuth = async(req, res) => {

    try {
        let { email, senha } = req.body;

        const user = await User.findOne({ where: { email } })

        if (user) {
            const passwordMatch = await compare(senha, user.senha)

            if (passwordMatch) {
                res.send(user)
            } else {
                res.status(401).send('Email/Senha inválido')
            }

        } else {
            res.status(401).send('Email/Senha inválido')
        }

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

module.exports = { getAllUsers, userAuth, addUser, editUser, deleteUser, findUserById };