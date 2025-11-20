const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth.routes')
const guardiansRoutes = require('./routes/guardians.routes')
const challengesRoutes = require('./routes/challenges.routes')
const duelsRoutes = require('./routes/duels.routes')
const { errorHandler } = require('./middleware/auth');
const { loggerGlobal } = require('./middleware/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerGlobal);

app.get('/', (req, res) => {
    res.json({ message: 'API Guardianes OK' });
});

app.use('/auth', authRoutes);
app.use('/guardians', guardiansRoutes);
app.use('/challenges', challengesRoutes);
app.use('/duels', duelsRoutes);

app.use(errorHandler);

module.exports = app;