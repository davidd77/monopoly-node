'use strict'; 
module.exports =
class Jugador{
	constructor(nomjug, id, pieza, dinero, posx, posy){
		this.nombre = nomjug; //Nombre del jugador
		this.id = id; //Numero de la casilla donde se encuentra
		this.pieza = pieza; //Nombre de la ficha
		this.dinero = dinero; //Dinero del jugador
		this.posx = posx; //Posicion margin-left
		this.posy = posy; //Posicion margin-top
		this.casillas = []; //Array que contiene las propiedades
		this.carcel = null; //Variable para saber si esta en la carcel
		this.enjuego = true; //Variable para saber si ha perdido o no
		this.estadocasilla = []; //Array para saber el estado de una propiedad
		this.cont = 0; //Contador para las array
	}

	getNom(){ //Devuelve el nombre del jugador
		return this.nombre;
	}

	setidfija(num){ //Actualiza la id
		this.id = num;
	}
	setid(num){ //Actualiza la id
		if(this.id+num>39){
			var num1 = 39-this.id;
			num = num - num1;
			this.id = num-1; 
		}else{
			this.id = this.id + num;
		}
	}

	getid(){ //Desvuelve la id
		return this.id;
	}

	c(){ //Funcion para el movimiendo al caer en la casilla de ir a la carcel
		this.id = 10;
	}

	getpieza(){ //Devuelve el nombre de la pieza
		return this.pieza;
	}

	getdinero(){ //Devuelve el dinero
		return this.dinero;
	}

	comprar(num, id){ //Actualiza el dinero y añade la casilla comprada a las array
		this.dinero = this.dinero - num;
		this.casillas[this.cont] = id;
		this.estadocasilla[this.cont] = 1;
		this.cont++;
	}

	getpropiedades(){ //Devuelve las propiedades
		return this.casillas;
	}

	comprobarpropiedad(id){ //Comprueba si es suya una propiedad
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id){
				return true;
			}
		}
		return false;
	}

	idestado(){ //Devuelve el estado de las propiedades
		return this.estadocasilla;
	}

	comprobarpropiedadhipotecada(id){ //Comprueba si una propiedad esta hipotecada
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id){
				var num = x;
			}
		}
		if(this.estadocasilla[num] == 1){
			return 2;
		}else if(this.estadocasilla[num] == 2){
			return 1;
		}else{
			return 0;
		}
	}

	hipotecar(id){ //Funcion para hipotecar
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id && this.estadocasilla[x]==1){
				this.estadocasilla[x]=2;
				return true;
			}else{
				return false;
			}
		}
		return false;
	}
	deshipotecar(id){ //Funcion para deshipotecar
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id && this.estadocasilla[x]==2){
				this.estadocasilla[x]=1;
				return true;
			}else{
				return false;
			}
		}
		return false;
	}
	cobrarhipoteca(num){ //Actualiza el dinero
		this.dinero = this.dinero+num;
	}
	cobrardeshipoteca(num){//Actualiza el dinero
		this.dinero = this.dinero-num;
	}
	gethipoteca(id){ //Devuelve el estado de una casilla en especifico
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id){
				if(this.estadocasilla[x] == 1){
					return true;
				}else{
					return false;
				}
			}
		}
		return false;
	}

	setip(ip){ //Se guarda la ip
		this.ip = ip;
	}

	getip(){ //Devuelve la ip
		return this.ip;
	}

	alquiler(num){ //Actualiza el dinero
		this.dinero = this.dinero - num;
	}

	impuestos(num){ //Actualiza el dinero
		this.dinero = this.dinero - num;
	}

	parking(num){ //Actualiza el dinero
		this.dinero = this.dinero + num;
	}

	salida(num){ //Actualiza el dinero
		this.dinero = this.dinero + num;
	}
	banca(num){ //Actualiza el dinero
		this.dinero = this.dinero +num;
	}
	perder(){ //Actualiza el estado de la partida
		this.enjuego == false;
	}
	getenpartida(){ //Devuelve el estado de la partida
		return this.enjuego;
	}
	cobraralquiler(num){ //Actualiza el dinero
		this.dinero = this.dinero + num;
	}
};