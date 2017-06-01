var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


mongoose.connect("mongodb://localhost/database"); 

var pieza = {num:Number, Nombre:String, url:String};
var pieza_schema = new Schema(pieza);
var Pieza = mongoose.model("piezas", pieza_schema);

var nueva = new Pieza({num:0, Nombre:"Dedal", url:"/img/pieza1.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Pieza({num:1, Nombre:"Carreta", url:"/img/pieza2.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Pieza({num:2, Nombre:"Zapato", url:"/img/pieza3.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Pieza({num:3, Nombre:"Perro", url:"/img/pieza4.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Pieza({num:4, Nombre:"Coche", url:"/img/pieza5.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Pieza({num:5, Nombre:"Gato", url:"/img/pieza6.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Pieza({num:6, Nombre:"Sombrero", url:"/img/pieza7.png"});
nueva.save(function(err){ console.log(err); });
var nueva = new Pieza({num:7, Nombre:"Barco", url:"/img/pieza8.png"});
nueva.save(function(err){ console.log(err); });


