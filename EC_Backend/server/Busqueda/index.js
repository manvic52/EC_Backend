var express = require('express'),
    Router = express.Router(),
    Inventario = require('../Inventario');

Router.get('/datos',(req,res)=>{
    Inventario.obtenerDatos()
        .then(datos=>{
            var ciudadesUnicas=[]
            var tiposUnicos=[]
            datos.forEach((dato=>{
                if(ciudadesUnicas.indexOf(dato.Ciudad) < 0){
                    ciudadesUnicas.push(dato.Ciudad)
                }
                if(tiposUnicos.indexOf(dato.Tipo) < 0){
                    tiposUnicos.push(dato.Tipo)
                }
            }))
            res.json({ciudades:ciudadesUnicas,tipos:tiposUnicos})
        }).catch(error =>{
            res.sendStatus(500).json(error)
        })
}),
Router.get('/inmuebles',(req,res)=>{
    Inventario.obtenerDatos()
        .then(inmuebles=>{
            res.json(inmuebles)
        }).catch(error =>{
            res.sendStatus(500).json(error)
        })
})

module.exports = Router;