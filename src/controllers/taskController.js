const Task = require('../models/Task');

const deleteTask = async(req, res) => {

    try {
        let { id } = req.body;
        let task = Task.destroy({ where: { id } })
        res.send(task)

    } catch (error) {
        res.send('houve um erro na edição ---' + error)
    }
}

const getAllTasks = async(req, res) => {

    try {
        Task.findAll().then(tasks => {
            res.send(tasks);
        });
    } catch (error) {
        res.status(404).send(error);
    }
}
const getTasksUser = async(req, res) => {

    try {
        let { usuario_id } = req.body
        Task.findAll({ where: { usuario_id } }).then(tasks => {
            res.send(tasks);
        });
    } catch (error) {
        res.status(404).send(error);
    }
}

const createNewTask = async(req, res) => {

    try {
        let { usuario_id, titulo, descricao, prioridade_tarefa, icone, categoria, data_e_hora_tarefa, status } = req.body

        Task.create({ usuario_id, titulo, descricao, prioridade_tarefa, icone, categoria, data_e_hora_tarefa, status }).then(response => {
            res.send(response);
        })

    } catch (error) {
        res.status(404).send(error);
    }
}

const updateTask = async(req, res) => {

    try {
        let { id, usuario_id, titulo, descricao, prioridade_tarefa, icone, categoria, data_e_hora_tarefa, status } = req.body

        Task.update({ usuario_id, titulo, descricao, prioridade_tarefa, icone, categoria, data_e_hora_tarefa, status }, { where: { id } }).then(response => {
            res.send(response);
        })

    } catch (error) {
        res.status(404).send(error);
    }
}

const finishTask = async(req, res) => {

    try {
        let { id } = req.body

        Task.update({ data_conclusao: new Date(), status: 2 }, { where: { id } }).then(response => {
            res.send(response);
        })

    } catch (error) {
        res.status(404).send(error);
    }
}


module.exports = { getAllTasks, getTasksUser, createNewTask, updateTask, finishTask, deleteTask };