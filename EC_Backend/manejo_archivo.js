var fs=require('fs'),
    path=require('path')

function obtenerData(){
    var pathDatos=__dirname+path.join(data.json);
    return new Promise(function(resolve,reject){
        fs.readFile(pathDatos,'utf8',function(err,datosLeidos){
            if(err) reject(err)
            resolve(JSON.parse(datosLeidos))
        })
    })
}
module.exports=obtenerData
