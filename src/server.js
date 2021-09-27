const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3001

const pool = require('./config/db')

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))


//cadastro
app.post('/newUser', (req, res) => {
    let { nome, email, senha } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(`SELECT id,nome,email FROM usuarios WHERE email = "${email}"`, (errEmail, rowsEmail) => {
            connection.release()

            if (!errEmail) {
                if (rowsEmail.length >= 1) {
                    res.send("Email já cadastrado")
                } else {
                    pool.getConnection((err, connection) => {
                        if (err) throw err

                        connection.query(`INSERT INTO usuarios (nome,email,senha) values ("${nome}","${email}","${senha}")`, (err, rows) => {
                            connection.release()

                            if (!err) {
                                res.status(201).send(rows)

                            } else {
                                console.log(err)
                            }
                        })
                    })
                }
            } else {
                console.log(errEmail)
            }
        })
    })
})


//autenticação
app.get('/auth', (req, res) => {
    let { email, senha } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(`SELECT id,nome,email FROM usuarios WHERE email = "${email}" AND senha = "${senha}"`, (err, rows) => {
            connection.release()

            if (!err) {
                if (rows.length === 0) {
                    res.status(204).send("Email/senha inválido")
                } else {
                    res.send(rows)
                }
            } else {
                console.log(err)
            }
        })
    })
})


app.get('/usuarios', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query('SELECT * FROM usuarios', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/tarefas/:id', (req, res) => {
    let { id } = req.params;

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(`SELECT * FROM Tarefas where usuario_id = "${id}"`, (err, rows) => {
            connection.release()

            if (!err) {
                if (rows.length === 0) {
                    res.status(204).send(rows)
                } else {

                    res.send(rows)
                }
            } else {
                console.log(err)
            }
        })
    })
})

// ADICIONAR TAREFA
app.post('/addTarefa', (req, res) => {
    let { usuario_id, titulo, descricao, prioridade_tarefa, icone, categoria, data_e_hora_tarefa } = req.body;


    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(`INSERT INTO Tarefas (usuario_id, titulo, descricao, prioridade_tarefa, icone, categoria, data_e_hora_tarefa) values ("${usuario_id}","${titulo}","${descricao}","${prioridade_tarefa}","${icone}","${categoria}","${data_e_hora_tarefa}")`, (err, rows) => {
            connection.release()

            if (!err) {
                res.status(201).send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.listen(port, () => { console.log(`ouvindo a porta ${port}`) })