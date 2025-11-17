const express = require('express');
const guardiansRoutes = require('./routes/guardians.routes')
const challengesRoutes = require('./routes/challenges.routes')
const duelsRoutes = require('./routes/duels.routes')
const { errorHandler } = require('./middleware/validation');
const { loggerGlobal } = require('./middleware/logger');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API Guardianes OK' });
});

app.use('/guardians', guardiansRoutes);
app.use('/challenges', challengesRoutes);
app.use('/duels', duelsRoutes);

app.use(errorHandler);
app.use(loggerGlobal);

module.exports = app;