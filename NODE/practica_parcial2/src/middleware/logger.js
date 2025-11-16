const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', '..', 'logs', 'app.log');

function loggerGlobal(req, res, next){
    const inicio = Date.now();

    res.on("finish", () => {
        const fin = Date.now();
        const tiempo = fin - inicio;

        const linea = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${res.statusCode} - ${tiempo}ms\n`;

        fs.appendFile(logFile, linea, (err) => {});
    });

    next();
};

module.exports = { loggerGlobal }