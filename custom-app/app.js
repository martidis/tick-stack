'use strict';

const express = require('express');
const process = require('process');

const PORT = 8080;
const HOST = '0.0.0.0';

// custom-app exposed endpoint
const app = express();
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

app.get('/api/down', (req, res) => {
    res.send('I will be killed now! But will restart :)');
    console.info("I was killed");
    process.exit(signals.SIGTSTP);
});


// graceful shutdown. Signals according to https://people.cs.pitt.edu/~alanjawi/cs449/code/shell/UnixSignals.htm
const signals = {
    'SIGHUP': 1,
    'SIGINT': 2,
    'SIGTERM': 15,
    'SIGTSTP': 24
};
// Do any necessary shutdown logic for our application here
const shutdown = (signal, value) => {
    console.log("shutdown!");
    server.close(() => {
        console.log(`server stopped by ${signal} with value ${value}`);
        process.exit(128 + value);
    });
};
// Create a listener for each of the signals that we want to handle
Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
        console.log(`process received a ${signal} signal`);
        shutdown(signal, signals[signal]);
    });
});