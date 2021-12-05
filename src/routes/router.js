const express = require('express')
const router = express.Router();
const { getAllUsers, userAuth, addUser, editUser, deleteUser, findUserById } = require('../controllers/usersController')
const { getAllTasks, getTasksUser, createNewTask, updateTask, finishTask, deleteTask } = require('../controllers/taskController')
const baseDir = `${__dirname}/../../build`

router.use(express.static(baseDir));
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

// USER
router.get('/api/usuarios', getAllUsers)
router.get('/api/findUserById', findUserById)
router.post('/api/auth', userAuth)
router.post('/api/createUser', addUser)
router.put('/api/updateUser', editUser)
router.delete('/api/deleteUser', deleteUser)

// TASKS
router.get('/api/getAllTasks', getAllTasks)
router.get('/api/getTasksUser/:usuario_id', getTasksUser)
router.post('/api/createNewTask', createNewTask)
router.put('/api/updateTask', updateTask)
router.put('/api/finishTask', finishTask)
router.post('/api/deleteTask', deleteTask)

// FRONT
router.get('/*', (req, res) => {
    res.sendFile('index.html', { root: baseDir })
})

module.exports = router