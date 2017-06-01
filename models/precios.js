var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


mongoose.connect("mongodb://localhost/database"); 

var precios = {num:Number, alquiler:Number, hipoteca:Number, preciocasa:Number, preciohotel:Number, casa1:Number, casa2:Number, casa3:Number, casa4:Number, hotel:Number};
var precios_schema = new Schema(precios);
var Pre = mongoose.model("Precios", precios_schema);
var nueva = new Pre({num:1, alquiler:2, hipoteca:30, preciocasa:50, preciohotel:50, casa1:10, casa2:30, casa3:90, casa4:160, hotel:250 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:3, alquiler:4, hipoteca:30, preciocasa:50, preciohotel:50, casa1:20, casa2:60, casa3:180, casa4:320, hotel:450 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:5, alquiler:25, hipoteca:100, preciocasa:0, preciohotel:0, casa1:0, casa2:0, casa3:0, casa4:0, hotel:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:6, alquiler:6, hipoteca:50, preciocasa:50, preciohotel:50, casa1:30, casa2:90, casa3:270, casa4:400, hotel:550 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:8, alquiler:6, hipoteca:50, preciocasa:50, preciohotel:50, casa1:30, casa2:90, casa3:270, casa4:400, hotel:550 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:9, alquiler:8, hipoteca:60, preciocasa:50, preciohotel:50, casa1:40, casa2:100, casa3:300, casa4:450, hotel:600 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:11, alquiler:10, hipoteca:70, preciocasa:100, preciohotel:100, casa1:50, casa2:150, casa3:450, casa4:625, hotel:750 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:12, alquiler:0, hipoteca:75, preciocasa:0, preciohotel:0, casa1:0, casa2:0, casa3:0, casa4:0, hotel:0 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:13, alquiler:10, hipoteca:70, preciocasa:100, preciohotel:100, casa1:50, casa2:150, casa3:450, casa4:625, hotel:750 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:14, alquiler:12, hipoteca:80, preciocasa:100, preciohotel:100, casa1:60, casa2:180, casa3:500, casa4:700, hotel:900 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:15, alquiler:25, hipoteca:100, preciocasa:0, preciohotel:0, casa1:0, casa2:0, casa3:0, casa4:0, hotel:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:16, alquiler:14, hipoteca:90, preciocasa:100, preciohotel:100, casa1:70, casa2:200, casa3:550, casa4:750, hotel:950 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:18, alquiler:14, hipoteca:90, preciocasa:100, preciohotel:100, casa1:70, casa2:200, casa3:550, casa4:750, hotel:950 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:19, alquiler:16, hipoteca:100, preciocasa:100, preciohotel:100, casa1:80, casa2:220, casa3:600, casa4:800, hotel:1000 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:21, alquiler:18, hipoteca:110, preciocasa:150, preciohotel:150, casa1:90, casa2:250, casa3:700, casa4:875, hotel:1050 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:23, alquiler:18, hipoteca:110, preciocasa:150, preciohotel:150, casa1:90, casa2:250, casa3:700, casa4:875, hotel:1050 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:24, alquiler:20, hipoteca:120, preciocasa:150, preciohotel:150, casa1:100, casa2:300, casa3:750, casa4:925, hotel:1100 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:25, alquiler:25, hipoteca:100, preciocasa:0, preciohotel:0, casa1:0, casa2:0, casa3:0, casa4:0, hotel:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:26, alquiler:22, hipoteca:130, preciocasa:150, preciohotel:150, casa1:110, casa2:330, casa3:800, casa4:975, hotel:1150 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:27, alquiler:20, hipoteca:120, preciocasa:150, preciohotel:150, casa1:100, casa2:300, casa3:750, casa4:925, hotel:1100 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:28, alquiler:0, hipoteca:75, preciocasa:0, preciohotel:0, casa1:0, casa2:0, casa3:0, casa4:0, hotel:0 });
nueva.save(function(err){ console.log(err); });;
var nueva = new Pre({num:29, alquiler:24, hipoteca:140, preciocasa:150, preciohotel:150, casa1:120, casa2:360, casa3:850, casa4:1025, hotel:1200 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:31, alquiler:26, hipoteca:150, preciocasa:200, preciohotel:200, casa1:130, casa2:390, casa3:900, casa4:1100, hotel:1275 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:31, alquiler:26, hipoteca:150, preciocasa:200, preciohotel:200, casa1:130, casa2:390, casa3:900, casa4:1100, hotel:1275 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:32, alquiler:26, hipoteca:150, preciocasa:200, preciohotel:200, casa1:130, casa2:390, casa3:900, casa4:1100, hotel:1275 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:34, alquiler:28, hipoteca:160, preciocasa:200, preciohotel:200, casa1:150, casa2:450, casa3:1000, casa4:1200, hotel:1400 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:35, alquiler:25, hipoteca:100, preciocasa:0, preciohotel:0, casa1:0, casa2:0, casa3:0, casa4:0, hotel:0 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:37, alquiler:35, hipoteca:175, preciocasa:200, preciohotel:200, casa1:175, casa2:500, casa3:1100, casa4:1300, hotel:1500 });
nueva.save(function(err){ console.log(err); });
var nueva = new Pre({num:39, alquiler:50, hipoteca:200, preciocasa:200, preciohotel:200, casa1:200, casa2:600, casa3:1400, casa4:1700, hotel:2000 });
nueva.save(function(err){ console.log(err); });




