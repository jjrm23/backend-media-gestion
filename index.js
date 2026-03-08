const express = require('express');
const { getConnection } = require('./db/db-connection-mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

getConnection(); 

app.use(cors()); 
app.use(express.json()); 


app.use('/genero', require('./routes/genero'));
app.use('/director', require('./routes/director'));
app.use('/productora', require('./routes/productora'));
app.use('/tipo', require('./routes/tipo'));
app.use('/media', require('./routes/media'));

app.listen(port, () => {
    console.log(` Servidor en puerto ${port}`);
});