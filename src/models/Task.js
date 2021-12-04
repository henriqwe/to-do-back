const Sequelize = require('sequelize');
const database = require('../config/db.js');

const Task = database.define('tarefas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING
    },
    prioridade_tarefa: {
        type: Sequelize.INTEGER
    },
    icone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categoria: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data_e_hora_tarefa: {
        type: Sequelize.DATE
    },
    data_conclusao: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

})

module.exports = Task;