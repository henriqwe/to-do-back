const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3001

const mysql = require('mysql')

const pool = mysql.createPool({
    host: '50.116.87.178',
    user: 'henri519_todo',
    password: 'todo123',
    database: 'henri519_todolist'
})

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))

//MYSQL

app.get('/usuarios', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

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
app.get('/tarefas', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM Tarefas', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})











app.listen(port, () => { console.log(`ouvindo a porta ${port}`) })