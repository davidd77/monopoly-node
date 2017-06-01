var socket = io.connect("192.168.1.105:8080", { 'forceNew': true}); //Hace connexion con el server

nombrejug = ""; //variable global donde se guardara el nombre del jugador
id = null; //variable global donde se guardara la id donde esta el jugador

socket.on("nombre", function(data, color, dinero){ //Funcion que se recibe al conectarse un jugador i le da el marcador por defecto
	nombrejug=data;
	document.getElementsByClassName("marcador1")[0].innerHTML = nombrejug;
	document.getElementsByClassName("cantidad")[0].innerHTML = dinero;
	$(".marcador").css("background-color", color);
});

socket.on("torn", function(torn){ //Funcion que muestra a quien le toca jugar
	if(torn==0){
		document.getElementsByClassName("torn")[0].innerHTML = "Es el torn del Jugador1";
	}else{
		document.getElementsByClassName("torn")[0].innerHTML = "Es el torn del Jugador2";
	}
})

//Inicio piezas al iniciar la partida
socket.on("posiciones", function(data){
	$(".piezajug1").css("margin-left", data[0][0]);
	$(".piezajug1").css("margin-top", data[0][1]);
	$(".piezajug2").css("margin-left", data[1][0]);
	$(".piezajug2").css("margin-top", data[1][1]);
});
//Fin inicio piezas

//Buscar una casilla en el select
function addbuscar(e) {
	if(0 != document.getElementsByTagName("select")[0].value){
		socket.emit("buscar.casilla", document.getElementsByTagName("select")[0].value);
	}
	return false;
}
socket.on("mostrar-casilla-buscador", function(data){
	var cas = document.getElementsByClassName("buscar");
	cas[0].setAttribute("src", data);
});
//Fin buscar

//Funciones del chat
socket.on("messages", function(data){ //Recibe el mensaje del server con el texto para emitirlo a todos los conectados
	render(data);
});

function render(data){ //Funcion para mostrar el contenido del texto
	var html = data.map(function(elem, index){
		return(`<div>
				  <strong>${elem.author}</strong>:
				  <em>${elem.text}</em>
				</div>`);
	}).join(" ");
	document.getElementById('messages').innerHTML = html;
}

function addMessage(e) { //Function que envia al server el mensaje enviado
	var payload = {
		author: nombrejug,
		text: document.getElementById("texto").value
	};

	socket.emit("new.message", payload);
	return false;
}
//Fin funciones del chat

//Movimiento fichas una vez dado a los dados
function mover(num, num2){
	numsum = num+num2;
	socket.emit("mov.fichas", numsum, nombrejug); //Envia al server que jugador ha tirado los dados y el numero que le ha salido
}
socket.on('mov.fichas.lateral', function(num, posoriginal, nomjug){ //Una combinacion de movimiento
	$( nomjug ).animate({
    	'margin-left': posoriginal+"px",
  	}, 3000);
});
socket.on('mov.fichas.vertical', function(num, posoriginal, nomjug){ //Una combinacion de movimiento
	$( nomjug ).animate({
    	'margin-top': posoriginal+"px",
  	}, 3000);
});
socket.on('mov.fichas.custom', function(num, posoriginal, posoriginal1, nomjug){//Una combinacion de movimiento
	$( nomjug ).animate({
    	'margin-left': posoriginal+"px",
  	}, 3000);
  	$( nomjug ).animate({
    	'margin-top': posoriginal1+"px",
  	}, 3000);
});
socket.on('mov.fichas.custom1', function(num, posoriginal, posoriginal1, nomjug){ //Una combinacion de movimiento
	$( nomjug ).animate({
    	'margin-top': posoriginal+"px",
  	}, 3000);
  	$( nomjug ).animate({
    	'margin-left': posoriginal1+"px",
  	}, 3000);
});
socket.on("mov.fichas.fijo", function(posoriginal, posoriginal1, nomjug){ //Una combinacion de movimiento
	$( nomjug ).animate({
    	'margin-left': posoriginal+"px",
    	'margin-top': posoriginal1+"px",
  	}, 3000);
})

socket.on("mov-fijo-lateral1", function(num, posoriginal, posoriginal1, nomjug){ //Una combinacion de movimiento
	$(nomjug).animate({
		'margin-left': posoriginal-65+"px"
	}, 1000);
	$(nomjug).animate({
		'margin-top': posoriginal1+"px"
	}, 3000);
	$(nomjug).animate({
		'margin-left': posoriginal+"px"
	}, 1000);
});

socket.on("mov-fijo-lateral2", function(num, posoriginal, posoriginal1, nomjug){ //Una combinacion de movimiento
	$(nomjug).animate({
		'margin-top': posoriginal1-65+"px"
	}, 1000);
	$(nomjug).animate({
		'margin-left': posoriginal+"px"
	}, 3000);
	$(nomjug).animate({
		'margin-top': posoriginal1+"px"
	}, 1000);
});

socket.on("mov-fijo-lateral3", function(num, posoriginal, posoriginal1, nomjug){ //Una combinacion de movimiento
	$(nomjug).animate({
		'margin-left': posoriginal+65+"px"
	}, 1000);
	$(nomjug).animate({
		'margin-top': posoriginal1+"px"
	}, 3000);
	$(nomjug).animate({
		'margin-left': posoriginal+"px"
	}, 1000);
});

socket.on("mov-fijo-lateral4", function(num, posoriginal, posoriginal1, nomjug){ //Una combinacion de movimiento
	$(nomjug).animate({
		'margin-top': posoriginal1+65+"px"
	}, 1000);
	$(nomjug).animate({
		'margin-left': posoriginal+"px"
	}, 3000);
	$(nomjug).animate({
		'margin-top': posoriginal1+"px"
	}, 1000);
});
//Fin movimiento fichas



// Mostrar casilla donde se ha caido
socket.on('mostrar-casilla', function(data){
	var cas = document.getElementsByClassName("mostrar-casilla");
	cas[0].setAttribute("src", data);
});
//Fin mostrar casilla




//Comprar/No comprar
socket.on("comprar", function(data){ //Funcion que activa los botones de comprar y no comprar
	id = data;
	$(".comprar").prop("disabled", false); 
	$(".nocomprar").prop("disabled", false);
});
socket.on("bloquear", function(){
	$("#result").prop("disabled", true); //Funcion que desactiva el boton de tirar los dados
});


function comprarpropiedad(){
	socket.emit("compra", id); //Funcion al darle click el boton comprar
}

socket.on("compra.definitiva", function(dinero){ //El jugador compra la propiedad i desactiva los botones de compra y no compra
	document.getElementsByClassName("cantidad")[0].innerHTML = dinero;
	$(".comprar").prop("disabled", true);
	$(".nocomprar").prop("disabled", true);
});

socket.on("desbloquear", function(){ //Activa el boton de tirar los dados
	$("#result").prop("disabled", false);
});


function nocomprarpropiedad(){//El jugador no compra desactiva los botones de compra y no compra
	socket.emit("nocomprar");
	$(".comprar").prop("disabled", true);
	$(".nocomprar").prop("disabled", true);
};

//Fin Comprar/No Comprar


//Alquiler
socket.on("alquiler/impuestos", function(dinero){ //Actualiza el dinero del marcador
	document.getElementsByClassName("cantidad")[0].innerHTML = dinero;
})


//Mostrar suerte
socket.on("suerte", function(data, num){
	alert(data);
	socket.emit("suerte-emision", num);
});

//Mostrar caja
socket.on("caja", function(data, num){
	alert(data);
	socket.emit("caja-emision", num);
});


socket.on("emision", function(dinero){ //Actualiza el dinero del marcador
	document.getElementsByClassName("cantidad")[0].innerHTML = dinero;
})


//Alquiler
socket.on("alquiler", function(){ //Funcion que desactiva los botones de compra y no compra al pagar automaticamente el alquiler
	$(".comprar").prop("disabled", false);
	$(".nocomprar").prop("disabled", false);
});


//Hipoteca
function hipotecar(){ //Funcion al darle al boton de hipotecar
	socket.emit("hipotecar", document.getElementsByTagName("select")[0].value);
}

socket.on("respuesta", function(respuesta){//Respuestas posibles al hipotecar/deshipotecar
	if(respuesta==0){
		alert("No es tu turno");
	}else if(respuesta == 1){
		alert("Se ha hipotecado la casilla selecionada");
	}else if(respuesta == 2){
		alert("La casilla selecionada no es tu propiedad no se puede hipotecar");
	}else if(respuesta == 3){
		alert("La casilla selecionada ya esta hipotecada o construida y no se puede hipotecar");
	}else if(respuesta==4){
		alert("Se ha deshipotecado");
	}else if(respuesta==5){
		alert("No esta hipotecada");
	}else{
		alert("La casilla selecionada no es tu propiedad no se puede deshipotecar");
	}
});

//Deshipoteca
function deshipotecar(){ //Funcion al darle click deshipotecar
	socket.emit("deshipotecar", document.getElementsByTagName("select")[0].value);
}

//Desconexion
socket.on("dis", function(nom){ 
	alert("Ha ganado "+nom+" por desconexion");
	window.location.replace("http://192.168.1.105:8080");
});

//Identidicador
socket.on("colorjugador", function(color, idcasilla){
	snapcasilla(color, idcasilla);
});

//Error compra
socket.on("Error", function(){
	alert("No tienes suficientes fondos");
});



//Fin de la partida
socket.on("fin-partida", function(nom){
	alert("Ha ganado "+ nom);
	window.location.replace("http://192.168.1.105:8080");
});