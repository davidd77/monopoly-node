var express = require('express');
var router = express.Router();
var server = require('http').Server(express());
var io = require('socket.io')(server);

router.get("/", function(req, res){
	res.render("pages/index");
});
router.get("/partida", function(req, res){
	res.render("pages/partida");
});
router.get("/juego", function(req, res){
	res.render("pages/tablero");
})

module.exports = router;