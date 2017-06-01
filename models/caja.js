var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


mongoose.connect("mongodb://localhost/database"); 

var caja = {num:Number, Nombre:String, precio:Number};
var caja_schema = new Schema(caja);
var S = mongoose.model("Caja", caja_schema);

var nueva = new S({num:0, Nombre:"Paga 200 euros al siguiente jugador", precio:200 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:1, Nombre:"Mueve a la casilla 39 y paga el precio de la casilla sin derecho a compra", precio:400 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:2, Nombre:"Bancarrota", precio:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:3, Nombre:"Robale 500 al jugador anterior", precio:500 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:4, Nombre:"Recibes la herencia de tus padres pero solo tienen deudas, pagas 300 euros (Tus padres reviven despues de pagar para gastar mas)", precio:300 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:5, Nombre:"Cobras 300 de la herencia de un familiar", precio:300 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:6, Nombre:"Te pagan 250 por el asesinato de un compañero", precio:250 });
nueva.save(function(err){ console.log(err); });
var nueva = new S({num:7, Nombre:"Atajo a la salida, cobras el doble", precio:400 });
nueva.save(function(err){ console.log(err); });