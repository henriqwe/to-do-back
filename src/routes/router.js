const express = require('express')
const router = express.Router();
const { getAllUsers, userAuth } = require('../controllers/usersController')
const baseDir = `${__dirname}/../../build`

router.use(express.static(baseDir));
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

// router.get('/', linkController.allLinks);
// router.get('/:title', linkController.redirect);
// router.get('/add', (req, res) => res.render('addLink'));
// router.get('/edit/:id', linkController.loadLink);


// router.post('/', linkController.addLink);
// router.post('/edit/:id', express.urlencoded({ extended: true }), linkController.editLink);

// router.delete('/:id', linkController.deleteLink)
// router.delete('/', express.urlencoded({ extended: true }), linkController.deleteLink)
// 


//cadastro
// router.post('/api/newUser', (req, res) => {
//     let { nome, email, senha } = req.body;

//     pool.getConnection((err, connection) => {
//         if (err) throw err

//         connection.query(`SELECT id,nome,email FROM usuarios WHERE email = "${email}"`, (errEmail, rowsEmail) => {
//             connection.release()

//             if (!errEmail) {
//                 if (rowsEmail.length >= 1) {
//                     res.send("Email já cadastrado")
//                 } else {
//                     pool.getConnection((err, connection) => {
//                         if (err) throw err

//                         connection.query(`INSERT INTO usuarios (nome,email,senha) values ("${nome}","${email}","${senha}")`, (err, rows) => {
//                             connection.release()

//                             if (!err) {
//                                 res.status(201).send(rows)

//                             } else {
//                                 console.log(err)
//                             }
//                         })
//                     })
//                 }
//             } else {
//                 console.log(errEmail)
//             }
//         })
//     })
// })

//autenticação
router.post('/api/auth', userAuth)

router.get('/api/usuarios', getAllUsers)

// router.get('/api/tarefas/:id', (req, res) => {
//     let { id } = req.params;

//     pool.getConnection((err, connection) => {
//         if (err) throw err

//         connection.query(`SELECT * FROM Tarefas where usuario_id = "${id}"`, (err, rows) => {
//             connection.release()

//             if (!err) {
//                 if (rows.length === 0) {
//                     res.status(204).send(rows)
//                 } else {

//                     res.send(rows)
//                 }
//             } else {
//                 console.log(err)
//             }
//         })
//     })
// })

// ADICIONAR TAREFA
// router.post('/api/addTarefa', (req, res) => {
//     let { usuario_id, titulo, descricao, prioridade_tarefa, icone, categoria, data_e_hora_tarefa } = req.body;


//     pool.getConnection((err, connection) => {
//         if (err) throw err

//         connection.query(`INSERT INTO Tarefas (usuario_id, titulo, descricao, prioridade_tarefa, icone, categoria, data_e_hora_tarefa) values ("${usuario_id}","${titulo}","${descricao}","${prioridade_tarefa}","${icone}","${categoria}","${data_e_hora_tarefa}")`, (err, rows) => {
//             connection.release()

//             if (!err) {
//                 res.status(201).send(rows)
//             } else {
//                 console.log(err)
//             }
//         })
//     })
// })

router.get('/*', (req, res) => {
    res.sendFile('index.html', { root: baseDir })
})

module.exports = router