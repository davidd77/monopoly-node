'use strict'; 
module.exports =
class Jugador{
	constructor(nomjug, id, pieza, dinero, posx, posy){
		this.nombre = nomjug;
		this.id = id;
		this.pieza = pieza;
		this.dinero = dinero;
		this.posx = posx;
		this.posy = posy;
		this.casillas = [];
		this.carcel = null;
		this.enjuego = true;
		this.estadocasilla = [];
		this.cont = 0;
		this.casa = 0;
		this.hotel = 0;
	}

	getNom(){
		return this.nombre;
	}

	setidfija(num){
		this.id = num;
	}
	setid(num){
		if(this.id+num>39){
			var num1 = 39-this.id;
			num = num - num1;
			this.id = num-1; 
		}else{
			this.id = this.id + num;
		}
	}

	getid(){
		return this.id;
	}

	c(){
		this.id = 10;
	}

	getpieza(){
		return this.pieza;
	}

	getdinero(){
		return this.dinero;
	}

	comprar(num, id){
		this.dinero = this.dinero - num;
		this.casillas[this.cont] = id;
		this.estadocasilla[this.cont] = 1;
		this.cont++;
	}

	getpropiedades(){
		return this.casillas;
	}

	comprobarpropiedad(id){
		for(var x=0; x<this.casillas.length; x++){
			if(this.casillas[x] == id){
				return true;
			}
		}
		return false;
	}

	idestado(){
		return this.estadocasilla;
	}

	comprobarpropiedadhipotecada(id){
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

	hipotecar(id){
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
	deshipotecar(id){
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
	cobrarhipoteca(num){
		this.dinero = this.dinero+num;
	}
	cobrardeshipoteca(num){
		this.dinero = this.dinero-num;
	}
	gethipoteca(id){
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

	setip(ip){
		this.ip = ip;
	}

	getip(){
		return this.ip;
	}

	alquiler(num){
		this.dinero = this.dinero - num;
	}

	impuestos(num){
		this.dinero = this.dinero - num;
	}

	parking(num){
		this.dinero = this.dinero + num;
	}

	salida(num){
		this.dinero = this.dinero + num;
	}
	banca(num){
		this.dinero = this.dinero +num;
	}
	perder(){
		this.enjuego == false;
	}
	getenpartida(){
		return this.enjuego;
	}
	cobraralquiler(num){
		this.dinero = this.dinero + num;
	}

	getcasa(){
		return this.casa;
	}

	gethotel(){
		return this.hotel;
	}
};