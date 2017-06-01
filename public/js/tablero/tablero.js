window.onload=function(){
	identificador = new Snap("#propiedades");
	propiedades = new Array();
	arraypos = [0,625,0,500,0,375,310,0,185,120,0,675,610,545,485,420,360,0,230,170,0,120,0,245,310,375,435,500,565,625,0,170,230,0,360,420,0,545,0,675];
}

function snapcasilla(color, id){ //Funcion para mostrar la marca identificativa en el tablero al comprar una propiedad
	if(id<=10){
		propiedades.push(identificador.text(arraypos[id],780, "P").attr({"fill": color}));
	}else if(id<=20){
		propiedades.push(identificador.text(35,arraypos[id], "P").attr({"fill": color}));
	}else if(id<=30){
		propiedades.push(identificador.text(arraypos[id],75, "P").attr({"fill": color}));
	}else{
		propiedades.push(identificador.text(720,arraypos[id], "P").attr({"fill": color}));
	}
}

