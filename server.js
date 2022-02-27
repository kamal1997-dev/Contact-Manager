const jsonServer = require('./Server/node_modules/json-server');
const server = jsonServer.create();

const path = require('path');
const express = require('express');

const middlewares = jsonServer.defaults();
const router = jsonServer.router('./Server/db.json');
const port = process.env.PORT || 4000;

server.use('./Server/db', middlewares, router);
server.use(express.static(path.join(__dirname, 'build')));

server.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port,()=>{console.log('hi kamal')});