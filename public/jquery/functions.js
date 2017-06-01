$(function(){
	var chat = $("#mess");
	chat.click(function(){
		$("#messages").animate({ scrollTop: $('#messages')[0].scrollHeight}, 0);
	});


	$(".comprar").click(function(){
		comprarpropiedad();
	});
	$(".nocomprar").click(function(){
		nocomprarpropiedad();
	});
	$(".hipotecar").click(function(){
		hipotecar();
	});
	$(".deshipotecar").click(function(){
		deshipotecar();
	});
	$(".construir").click(function(){
	alert(document.getElementsByTagName("select")[0].value);
	});
	$(".desconstruir").click(function(){
	alert(document.getElementsByTagName("select")[0].value);
	});
	$(".bancarrota").click(function(){
		bancarrota();
	});
});