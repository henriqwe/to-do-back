const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const router = require('./routes/router');
var cors = require('cors')

app.use(cors())

app.use('/', router);

app.listen(port, () => { console.log(`ouvindo a porta ${port}`) })