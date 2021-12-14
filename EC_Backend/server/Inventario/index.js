var fs = require('fs'),
    path = require('path')

module.exports = {
    obtenerDatos: function(){
        var pathDatos = path.join(__dirname,'data.json')
        return new Promise(function(resolve,reject){
            fs.readFile(pathDatos,'utf8',function(err,datosLeidos){
                if(err)reject(err)
                resolve(JSON.parse(datosLeidos))
            })
        })
    }
}