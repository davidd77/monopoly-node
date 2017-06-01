//Este archivo es para la accion de los dados

$(function(){
	var dice = $("#dice"); //Se guarda el dado 1
	var dice2 = $("#dice2"); //Se guarda el dado 2
	var button = $("#result"); //Se guarda el boton de los dados
	button.click(function(){ //Accion click en el boton
		$(".wrap").css("display", "block"); //Muestra los dados
		$(".wrap").append("<div id='dice_mask'></div>"); //Empieza la animacion
		dice.attr("class","dice");
		dice.css('cursor','default');
		dice2.attr("class","dice");
		dice2.css('cursor','default');
		var num = Math.floor(Math.random()*6+1);
		var num2 = Math.floor(Math.random()*6+1);
		var rotaciondado1 = Math.floor(Math.random()*3+1);
		var rotaciondado2 = Math.floor(Math.random()*3+1);
		if(rotaciondado1 == 1){
			dice.animate({left: '+2px'}, 100,function(){
				dice.addClass("dice_t");
			}).delay(200).animate({top:'-2px'},100,function(){
				dice.removeClass("dice_t").addClass("dice_s");
			}).delay(200).animate({opacity: 'show'},600,function(){
				dice.removeClass("dice_s").addClass("dice_e");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				dice.removeClass("dice_e").addClass("dice_"+num);
				dice.css('cursor','pointer');
				$("#dice_mask").remove();//remove mask
			});
		}else if(rotaciondado1==2){
			dice.animate({left: '+2px'}, 100,function(){
				dice.addClass("dice_t1");
			}).delay(200).animate({top:'-2px'},100,function(){
				dice.removeClass("dice_t1").addClass("dice_s1");
			}).delay(200).animate({opacity: 'show'},600,function(){
				dice.removeClass("dice_s1").addClass("dice_e1");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				dice.removeClass("dice_e1").addClass("dice_"+num);
				dice.css('cursor','pointer');
				$("#dice_mask").remove();//remove mask
			});
		}else{
			dice.animate({left: '+2px'}, 100,function(){
				dice.addClass("dice_t2");
			}).delay(200).animate({top:'-2px'},100,function(){
				dice.removeClass("dice_t2").addClass("dice_s2");
			}).delay(200).animate({opacity: 'show'},600,function(){
				dice.removeClass("dice_s2").addClass("dice_e2");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				dice.removeClass("dice_e2").addClass("dice_"+num);
				dice.css('cursor','pointer');
				$("#dice_mask").remove();//remove mask
			});
		}
		if(rotaciondado2==1){
			dice2.animate({left: '+2px'}, 100,function(){
				dice2.addClass("dice_t");
			}).delay(200).animate({top:'-2px'},100,function(){
				dice2.removeClass("dice_t").addClass("dice_s");
			}).delay(200).animate({opacity: 'show'},600,function(){
				dice2.removeClass("dice_s").addClass("dice_e");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				dice2.removeClass("dice_e").addClass("dice_"+num2);
				dice2.css('cursor','pointer');
				$("#dice_mask").remove();//remove mask
			});
		}else if(rotaciondado2==2){
			dice2.animate({left: '+2px'}, 100,function(){
				dice2.addClass("dice_t1");
			}).delay(200).animate({top:'-2px'},100,function(){
				dice2.removeClass("dice_t1").addClass("dice_s1");
			}).delay(200).animate({opacity: 'show'},600,function(){
				dice2.removeClass("dice_s1").addClass("dice_e1");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				dice2.removeClass("dice_e1").addClass("dice_"+num2);
				dice2.css('cursor','pointer');
				$("#dice_mask").remove();//remove mask
			});
		}else{
			dice2.animate({left: '+2px'}, 100,function(){
				dice2.addClass("dice_t2");
			}).delay(200).animate({top:'-2px'},100,function(){
				dice2.removeClass("dice_t2").addClass("dice_s2");
			}).delay(200).animate({opacity: 'show'},600,function(){
				dice2.removeClass("dice_s2").addClass("dice_e2");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				dice2.removeClass("dice_e2").addClass("dice_"+num2);
				dice2.css('cursor','pointer');
				$("#dice_mask").remove();//remove mask
			});
		}
		setTimeout(function(){ //A los 3 segundos vuelve invisible los dados
			$(".wrap").css("display", "none");
		}, 3000);
		mover(num, num2); //Envia el resultado de los dados al cliente
	});
});
