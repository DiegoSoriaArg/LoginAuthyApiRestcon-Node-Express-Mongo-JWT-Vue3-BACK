const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();


// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.9hwf3.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

//mongodb+srv://<username>:<password>@cluster0.9hwf3.mongodb.net/<dbname>?retryWrites=true&w=majority

const opcion = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri,opcion)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
const authRoutes = require ('./routes/auth');
const validaToken = require ('./routes/validate-token');
const admin = require ('./routes/admin');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin',validaToken, admin);
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})