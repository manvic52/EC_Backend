var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    buscador = require('./server/Busqueda')

var app = express(),
    Server = http.createServer(app),
    port = port = process.env.port || 8080

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/busqueda',buscador)

Server.listen(port,function(){
    console.log("Se ha iniciado el servidor y escucha en el puerto: "+port);
})

