const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/auth.routes')
// importar rutas especificas

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PATCH',],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get('/', (_req, res) => {
    res.json({ message: 'API corriendo OK.'});
});

app.use('/auth', authRoutes);

app.use(errorHandler);

module.exports = app;
