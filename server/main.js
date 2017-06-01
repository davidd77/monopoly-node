var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Msg = require('../models/schema').msg;
var Cas = require('../models/schema').cas;
var precios = require('../models/schema').precio;
var suerte = require('../models/schema').s;
var caja = require('../models/schema').c;
var ruta = require('../routes/routes.main');
var jug = require('../clases/jugador');

//Objetos
jugador = new Array(2);
jugador[0] = new jug("Jugador1", 0, ".piezajug1", 1500);
jugador[1] = new jug("Jugador2", 0, ".piezajug2", 1500);

//Variables
colores = ["red", "lightblue"];
suertecaja = [2,7,17,22,33,36];
casillasesp = [0,4,10,20,30,38];
impuestos = 0;
mov = new Array(2);
mov[0] = [700,700];
mov[1] = [700,700];
var turno = 0;
var arrayips = [];
var arrayid = [];
dis = true;

//Llamada a la vista
app.set("view engine", "ejs");


//Llamada al schema de mensajes
var messages = [];
Msg.find({}, function(err, mensajes){ 
	mensajes.map(function(elem, index){ 
	messages.push({id: messages.length, text:elem.texto, author:elem.autor}); 
	}); 
});


app.use(express.static('public'));
app.use("/", ruta);


//Connection
io.on('connection', function(socket) {
	if(arrayips.length < 2){
		var address = socket.handshake; //Se obtiene la IP de quien se acaba de conectar
		if(arrayips.length<2){ 
			arrayid.push(socket.id); //Se añade la ID a la array
			arrayips.push(address.address); //Se añade la IP a la array
			socket.emit("nombre", jugador[arrayips.length-1].getNom(), colores[arrayips.length-1], jugador[arrayips.length-1].getdinero());
			io.sockets.emit("torn", turno);
			console.log("Usuario conectado");
		}
	}else{
		console.log("Limite superado");
		socket.emit("nombre", "Espectador", "white", 0); //Espectador cuando la array esta completa
	}

	socket.emit("posiciones", mov); //Muestra las casillas en la posicion donde se encuentre en ese momento de la partida
	socket.emit("messages", messages); //Muestra los mensajes del chat

	//Chat
	console.log('Alguien se ha conectado con Sockets');
	console.log(arrayips);
	console.log(arrayid);
	socket.on('new.message', function(data){ //Funcion para guardar en la base de dados el mensaje enviado en el chat
			messages.push(data);
			var mensaje = new Msg({autor:data.author, texto:data.text}); 
			mensaje.save(function(err){ console.log(err); });
			io.sockets.emit("messages", messages); //Mostrar a todos el mensaje enviado
	});


	//Movimiento fichas
	socket.on('mov.fichas', function(data, nom){
		var address = socket.handshake;
		if(arrayips[turno] == address.address){

			//Movimiento depende la posicion donde se encuentre el jugador el movimiento sera uno de los predeterminados a continuacion
			if(jugador[turno].getid()<10){
				if(jugador[turno].getid()==9 && data == 12){
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] - 65*10;
					io.sockets.emit("mov-fijo-lateral", data, mov[turno][0], mov[turno][1], jugador[turno].getpieza());
				}else if(data+jugador[turno].getid()<=10){
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] - data*65;
					io.sockets.emit("mov.fichas.lateral", data, mov[turno][0], jugador[turno].getpieza());
				}else{
					var custommov = 10-jugador[turno].getid();
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] - custommov*65;
					mov[turno][1] = mov[turno][1] - (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom", data, mov[turno][0], mov[turno][1], jugador[turno].getpieza());
				}
			}else if(jugador[turno].getid()>=10 && jugador[turno].getid()<20){
				if(jugador[turno].getid()==19 && data == 12){
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] + 65*10;
					io.sockets.emit("mov-fijo-lateral2", data, mov[turno][0], mov[turno][1], jugador[turno].getpieza())
				}else if(data+jugador[turno].getid()<=20){
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] - data*65;
					io.sockets.emit("mov.fichas.vertical", data, mov[turno][1], jugador[turno].getpieza());
				}else{
					var custommov = 20-jugador[turno].getid();
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] - custommov*65;
					mov[turno][0] = mov[turno][0] + (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom1", data, mov[turno][1], mov[turno][0], jugador[turno].getpieza());
				}
			}else if(jugador[turno].getid()>=20 && jugador[turno].getid()<30){
				if(jugador[turno].getid()==29 && data == 12){
					jugador[turno].salida(200);
					socket.emit("alquiler/impuestos", jugador[turno].getdinero());
					jugador[turno].setidfija(1);
					mov[turno][1] = mov[turno][1] + 65*10;
					io.sockets.emit("mov-fijo-lateral3", data, mov[turno][0], mov[turno][1], jugador[turno].getpieza())
				}else if(data+jugador[turno].getid()<=30){
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] + data*65;
					io.sockets.emit("mov.fichas.lateral", data, mov[turno][0], jugador[turno].getpieza());
				}else{
					var custommov = 30-jugador[turno].getid();
					jugador[turno].setid(data);
					mov[turno][0] = mov[turno][0] + custommov*65;
					mov[turno][1] = mov[turno][1] + (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom", data, mov[turno][0], mov[turno][1], jugador[turno].getpieza());
				}
			}else{
				if(jugador[turno].getid()==39 && data == 12){
					jugador[turno].salida(200);
					socket.emit("alquiler/impuestos", jugador[turno].getdinero());
					jugador[turno].setidfija(11);
					mov[turno][0] = mov[turno][0] + 65*10;
					io.sockets.emit("mov-fijo-lateral4", data, mov[turno][0], mov[turno][1], jugador[turno].getpieza())
				}else if(data+jugador[turno].getid()<=39){
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] + data*65;
					io.sockets.emit("mov.fichas.vertical", data, mov[turno][1], jugador[turno].getpieza());
				}else{
					jugador[turno].salida(200);
					socket.emit("alquiler/impuestos", jugador[turno].getdinero());
					var custommov = 40-jugador[turno].getid();
					jugador[turno].setid(data);
					mov[turno][1] = mov[turno][1] + custommov*65;
					mov[turno][0] = mov[turno][0] - (data-custommov)*65;
					io.sockets.emit("mov.fichas.custom1", data, mov[turno][1], mov[turno][0], jugador[turno].getpieza());
				}
			}
			url = "";
			Cas.find({num:jugador[turno].getid()}, function(err, casnumber){ //Se muestra la casilla donde a caido el jugador con esta llamada a la base de dados
				casnumber.map(function(elem, index){ 
					socket.emit("mostrar-casilla", elem.url);
				}); 
			});
			//Comprobacion suerte/caja
			sc = false; //sc = suerte y caja
			for(var x=0; x<suertecaja.length; x++){
				if(jugador[turno].getid() == suertecaja[x]){
					var num = Math.floor(Math.random()*7);
					if(suertecaja[x] == 2 || suertecaja[x] == 17 || suertecaja[x] == 33){
						caja.find({num:num}, function(err, alnumber){
							alnumber.map(function(elem, index){
								socket.emit("caja", elem.Nombre , num); //Si ha caido en una casilla de caja mandara a la funcion donde se aplicara el efecto
							});
						});
					}else{
						suerte.find({num:num}, function(err, alnumber){
							alnumber.map(function(elem, index){
								socket.emit("suerte", elem.Nombre, num); //Si ha caido en una casilla de suerte mandara a la funcion donde se aplicara el efecto
							});
						});
					}
					sc = true;
				}
			}

			//Comprobacion de carcel, parking y impuestos
			cesp = false
			for(var x=0; x<casillasesp.length; x++){
				if(jugador[turno].getid() == casillasesp[x]){
					cesp = true;
					if(casillasesp[x] == 30){
						jugador[turno].c();
						mov[turno][1] = mov[turno][1] + 10*65;
						mov[turno][0] = mov[turno][0] - 10*65;
						io.sockets.emit("mov.fichas.custom1", data, mov[turno][1], mov[turno][0], jugador[turno].getpieza());
					}else if(casillasesp[x] == 4 || casillasesp[x] == 38){
						Cas.find({num:jugador[turno].getid()}, function(err, alnumber){
							alnumber.map(function(elem, index){
								if(turno==0){
									jugador[1].impuestos(elem.precio);
									socket.emit("alquiler/impuestos", jugador[1].getdinero());
									if(jugador[1].getdinero()<0){
										io.sockets.emit("fin-partida", jugador[0].getNom());
									}
								}else{
									jugador[0].impuestos(elem.precio);
									socket.emit("alquiler/impuestos", jugador[0].getdinero());
									if(jugador[0].getdinero()<0){
										io.sockets.emit("fin-partida", jugador[1].getNom());
									}
								}
								impuestos = impuestos + elem.precio;
							});
						});
					}else if(casillasesp[x] == 20){
						jugador[turno].parking(impuestos);
						socket.emit("alquiler/impuestos", jugador[turno].getdinero());	
					}
				}
			}

			//Si sc == true o cesp==true no se le activaran las opciones de comprar y no comprar
			if(sc != true && cesp!=true){
				var propiedadjug1 = jugador[0].comprobarpropiedadhipotecada(jugador[turno].getid());
				var propiedadjug2 = jugador[1].comprobarpropiedadhipotecada(jugador[turno].getid());
				if(propiedadjug1==0 && propiedadjug2==0){ //Comprueba si la casilla tiene propietario si no tiene entrada en este if
					socket.emit("comprar", jugador[turno].getid());
					io.sockets.emit("bloquear");
				}else{ //Si tiene propietario entrara aqui i se comprobara si tiene que pagar alquiler o no
					precios.find({num:jugador[turno].getid()}, function(err, alnumber){
							alnumber.map(function(elem,index){
								if(propiedadjug1 == 2){
										if(turno == 0){
											jugador[1].alquiler(elem.alquiler);
											jugador[0].cobraralquiler(elem.alquiler);
											socket.emit("alquiler/impuestos", jugador[1].getdinero());
											io.to(arrayid[0]).emit("emision", jugador[0].getdinero());
											if(jugador[1].getdinero()<0){
												io.sockets.emit("fin-partida", jugador[0].getNom());
											}
										}
								}else if(propiedadjug2 == 2){
									if(turno == 1){
											jugador[turno-1].alquiler(elem.alquiler);
											jugador[1].cobraralquiler(elem.alquiler);
											socket.emit("alquiler/impuestos", jugador[turno-1].getdinero());
											io.to(arrayid[1]).emit("emision", jugador[1].getdinero());
											if(jugador[0].getdinero()<0){
												io.sockets.emit("fin-partida", jugador[1].getNom());
											}
										}
								}
							});
						});
				}
			}
			//Cambia automaticamente de turno una vez el jugador que es su turno le da a los dados
			turno++;
			if(turno == 2){
				turno = 0;
			}
			io.sockets.emit("torn", turno); //Actualiza el mensaje de turnos en el marcador
		}
	});

	//Buscar casilla en el buscador del panel lateral
	socket.on("buscar.casilla", function(id){
		Cas.find({num:id}, function(err, casnumber){ 
			casnumber.map(function(elem, index){ 
				socket.emit("mostrar-casilla-buscador", elem.url);
			}); 
		});
	})


	//Usuario desconectado, se reinician las variables que se utilizan durante la partida
	socket.on("disconnect", function(){
		var address = socket.handshake;
		var dis = arrayips.indexOf(address.address);
		if(arrayips[dis] == address.address){
			if(dis==0){
				io.sockets.emit("dis", jugador[1].getNom());
			}else{
				io.sockets.emit("dis", jugador[0].getNom());
			}
			arrayips = [];
			arrayid = [];
			jugador[0] = new jug("Jugador1", 0, ".piezajug1", 1500);
			jugador[1] = new jug("Jugador2", 0, ".piezajug2", 1500);
			mov[0] = [700,700];
			mov[1] = [700,700];
			turno = 0;
		}
	});


	//Compra de casilla
	socket.on("compra", function(id){

		Cas.find({num:id}, function(err, casnumber){ 
			casnumber.map(function(elem, index){ 

				if(turno == 0){
					if(jugador[1].getdinero()<elem.precio){//Comprueba si tiene dinero
						socket.emit("Error");
					}else{ //El jugador compra la propedad
						jugador[1].comprar(elem.precio, elem.num);
						socket.emit("compra.definitiva", jugador[1].getdinero());
						io.sockets.emit("desbloquear");
						io.sockets.emit("colorjugador", "lightblue", jugador[1].getid());
					}
				}else{
					if(jugador[0].getdinero()<elem.precio){ //Comprueba si tiene dinero
						socket.emit("Error"); 
					}else{ //El jugador compra la propiedad
						jugador[turno-1].comprar(elem.precio, elem.num); 
						socket.emit("compra.definitiva", jugador[turno-1].getdinero());
						io.sockets.emit("desbloquear");
						io.sockets.emit("colorjugador", "lightblue", jugador[0].getid());
					}
				}
			}); 
		});

	});


	//No comprar casilla
	socket.on("nocomprar", function(){
		io.sockets.emit("desbloquear");
	});

	//Activar accion de suerte, depende el numero random que se le pasa por parametro el efecto sera uno o otro
	socket.on("suerte-emision", function(num){
		if(num==0){
			if(turno==0){
				jugador[1].banca(200);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
			}else{
				jugador[0].banca(200);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());				
			}
		}else if(num==1){
			if(turno==0){
				jugador[1].impuestos(200);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());				
			}else{
				jugador[0].impuestos(200);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());				
			}
		}else if(num==2){
			if(turno==0){
				jugador[1].setidfija(15);
				mov[1][0] = 50;
				mov[1][1] = 375;
				io.sockets.emit("mov.fichas.fijo", mov[1][0], mov[1][1], jugador[1].getpieza());
			}else{
				jugador[0].setidfija(15);
				mov[0][0] = 50;
				mov[0][1] = 375;
				io.sockets.emit("mov.fichas.fijo", mov[0][0], mov[0][1], jugador[0].getpieza());
			}
		}else if(num==3){
			if(turno==0){
				jugador[1].setidfija(10);
				jugador[1].impuestos(50);
				mov[1][0] = 50;
				mov[1][1] = 700;
				io.sockets.emit("mov.fichas.fijo", mov[1][0], mov[1][1], jugador[1].getpieza());
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
			}else{
				jugador[0].setidfija(10);
				jugador[0].impuestos(50);
				mov[0][0] = 50;
				mov[0][1] = 700;
				io.sockets.emit("mov.fichas.fijo", mov[0][0], mov[0][1], jugador[0].getpieza());
				socket.emit("alquiler/impuestos", jugador[0].getdinero());
			}
		}else if(num==4){
			if(turno==0){
				jugador[1].impuestos(jugador[1].getcasa()*100);
				jugador[1].impuestos(jugador[1].gethotel()*500);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
			}else{
				jugador[0].impuestos(jugador[0].getcasa()*100);
				jugador[0].impuestos(jugador[0].gethotel()*500);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());
			}
		}else if(num==5){
			if(turno==0){
				jugador[1].impuestos(1000);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
			}else{
				jugador[0].impuestos(1000);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());				
			}
		}else if(num==6){
			if(turno==0){
				jugador[1].setidfija(38);
				jugador[1].impuestos(500);
				mov[1][0] = 700;
				mov[1][1] = 570;
				io.sockets.emit("mov.fichas.fijo", mov[1][0], mov[1][1], jugador[1].getpieza());
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
			}else{
				jugador[0].setidfija(38);
				jugador[0].impuestos(500);
				mov[0][0] = 700;
				mov[0][1] = 570;
				io.sockets.emit("mov.fichas.fijo", mov[0][0], mov[0][1], jugador[0].getpieza());
				socket.emit("alquiler/impuestos", jugador[0].getdinero());
			}			
		}
		if(jugador[0].getdinero()<0){
			io.sockets.emit("fin-partida", jugador[1].getNom());
		}else if(jugador[1].getdinero()<0){	
			io.socket.emit("fin-partida", jugador[0].getNom());
		}
	});


	//Activar accion de caja, depende el numero pasado por parametro el efecto sera uno o otro
	socket.on("caja-emision", function(num){
		if(num==0){
			if(turno==0){
				jugador[1].impuestos(200);
				jugador[0].banca(200);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
				io.to(arrayid[0]).emit("emision", jugador[0].getdinero());
			}else{
				jugador[0].impuestos(200);
				jugador[1].banca(200);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());
				io.to(arrayid[1]).emit("emision", jugador[1].getdinero());			
			}
		}else if(num==1){
			if(turno==0){
				jugador[1].setidfija(39);
				jugador[1].impuestos(400);
				mov[1][0] = 700;
				mov[1][1] = 635;
				io.sockets.emit("mov.fichas.fijo", mov[1][0], mov[1][1], jugador[1].getpieza());
				socket.emit("alquiler/impuestos", jugador[1].getdinero());			
			}else{
				jugador[0].setidfija(39);
				jugador[0].impuestos(400);
				mov[0][0] = 700;
				mov[0][1] = 635;
				io.sockets.emit("mov.fichas.fijo", mov[0][0], mov[0][1], jugador[0].getpieza());
				socket.emit("alquiler/impuestos", jugador[0].getdinero());				
			}
		}else if(num==2){
			if(turno==0){
				io.sockets.emit("fin-partida", jugador[0].getNom());
			}else{
				io.sockets.emit("fin-partida", jugador[1].getNom());
			}
		}else if(num==3){
			if(turno==0){
				jugador[1].banca(500);
				jugador[0].impuestos(500);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
				io.to(arrayid[0]).emit("emision", jugador[0].getdinero());
			}else{
				jugador[0].banca(500);
				jugador[1].impuestos(500);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());
				io.to(arrayid[1]).emit("emision", jugador[1].getdinero());
			}
		}else if(num==4){
			if(turno==0){
				jugador[1].impuestos(300);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
			}else{
				jugador[0].impuestos(300);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());
			}
		}else if(num==5){
			if(turno==0){
				jugador[1].banca(300);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
			}else{
				jugador[0].impuestos(300);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());				
			}
		}else if(num==6){
			if(turno==0){
				jugador[1].banca(250);
				socket.emit("alquiler/impuestos", jugador[1].getdinero());
			}else{
				jugador[0].impuestos(250);
				socket.emit("alquiler/impuestos", jugador[0].getdinero());				
			}			
		}else{
			if(turno==0){
				jugador[1].setidfija(0);
				jugador[1].banca(400);
				mov[1][0] = 700;
				mov[1][1] = 700;
				io.sockets.emit("mov.fichas.fijo", mov[1][0], mov[1][1], jugador[1].getpieza());
				socket.emit("alquiler/impuestos", jugador[1].getdinero());			
			}else{
				jugador[0].setidfija(0);
				jugador[0].impuestos(400);
				mov[0][0] = 700;
				mov[0][1] = 635;
				io.sockets.emit("mov.fichas.fijo", mov[0][0], mov[0][1], jugador[0].getpieza());
				socket.emit("alquiler/impuestos", jugador[0].getdinero());				
			}
		}
		if(jugador[0].getdinero()<0){
			io.sockets.emit("fin-partida", jugador[1].getNom());
		}else if(jugador[1].getdinero()<0){	
			io.sockets.emit("fin-partida", jugador[0].getNom());
		}
	});

	//Hipoteca, se comprueba si es su turno si la casilla cuya id se pasa por parametro es de su propiedad y que no este hipotecada
	socket.on("hipotecar", function(id){
		var address = socket.handshake;
		if(arrayips[turno] == address.address){
			var propiedad = jugador[turno].comprobarpropiedad(id);
			if(propiedad == true){
				var hipotec = jugador[turno].hipotecar(id);
				if(hipotec==true){
					precios.find({num:jugador[turno].getid()}, function(err, alnumber){
							alnumber.map(function(elem, index){
							jugador[turno].cobrarhipoteca(elem.hipoteca);
							socket.emit("alquiler/impuestos", jugador[turno].getdinero());
						});
					});
					socket.emit("respuesta", 1);
				}else{
					socket.emit("respuesta", 3);
				}
			}else{
				socket.emit("respuesta", 2);
			}
		}else{
			socket.emit("respuesta", 0);
		}
	});

	//deshipoteca, se comprueba que sea su turno, que la propiedad que se pasa por parametro sea suya, que este hipotecada y que tenga dinero para pagarla
	socket.on("deshipotecar", function(id){
		var address = socket.handshake;
		if(arrayips[turno] == address.address){
			var propiedad = jugador[turno].comprobarpropiedad(id);
			if(propiedad == true){
				var hipotec = jugador[turno].deshipotecar(id);
				if(hipotec==true){
					precios.find({num:jugador[turno].getid()}, function(err, alnumber){
							alnumber.map(function(elem, index){
							if(jugador[turno].getdinero()<elem.hipoteca){
								socket.emit("Error");
							}else{
								jugador[turno].impuestos(elem.hipoteca);
								socket.emit("alquiler/impuestos", jugador[turno].getdinero());
							}
						});
					});
					socket.emit("respuesta", 4);
				}else{
					socket.emit("respuesta", 5);
				}
			}else{
				socket.emit("respuesta", 6);
			}
		}else{
			socket.emit("respuesta", 0);
		}
	});


});


server.listen(8080, function(){
	console.log("Servidor corriendo en http://localhost:8080");
})
