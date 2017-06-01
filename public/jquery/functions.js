$(function(){
	var chat = $("#mess");
	chat.click(function(){ //Funcion para ir abajo del chat cuando envies un mensaje
		$("#messages").animate({ scrollTop: $('#messages')[0].scrollHeight}, 0);
	});


	$(".comprar").click(function(){ //Funcion al darle click a comprar
		comprarpropiedad();
	});
	$(".nocomprar").click(function(){ //Funcion al darle click a no comprar
		nocomprarpropiedad();
	});
	$(".hipotecar").click(function(){ //Funcion al darle click a hipotecar
		hipotecar();
	});
	$(".deshipotecar").click(function(){ //Funcion al darle click a deshipotecar
		deshipotecar();
	});
});