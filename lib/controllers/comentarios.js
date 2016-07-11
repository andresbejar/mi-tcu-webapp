'use strict';

//=========================================================================
// API Deprecado, todas las funciones estan en el controlador proyectos.js
//=========================================================================


//API para IMEC de comentarios
var mongoose = require('mongoose'),
	Comentario = mongoose.model('Comentario'),
	Proyecto = mongoose.model('Proyecto');


/*
* Crear un nuevo comentario
*/
//TODO: Agregar el comentario al array de comentarios de un proyecto
exports.create = function(req, res){
	var comentario = new Comentario();
	comentario.autor.nombre = req.body.autor;
	comentario.autor.id = req.body.autorID;
	comentario.proyecto = req.body.proyectoId; //OJO
	comentario.contenido = req.body.contenido;
	comentario.save(function(err){
		if(err)
			return res.json(400, err);
		else

			return res.json(comentario);
	});
};

/*
* Leer un comentario
*/
exports.read = function(req, res){
	Comentario.findById(req.params.id).populate('proyecto').exec(function(err, comentario){
		if(err)
			return res.send(err);
		if(!comentario)
			return res.send(404);
		else
			return res.json({
				'autor': comentario.autor,
				'proyecto': comentario.proyecto.nombre,
				'proyecto_id': comentario.proyecto.codigo,
				'contenido': comentario.contenido,
				'fecha': comentario.fecha
			});
	});
};

/*
* No se deberia poder editar un comentario.... o si?
*/

/*
* Borrar un comentario
*/

exports.delete = function(req, res){
	Comentario.findByIdAndRemove(req.params.id, function(err, comentario){
		if(err)
			return res.send(err);
		if(!comentario)
			return res.send(404);
		else
			return res.send(200);
	});
};

/*
* TODO: Hacer un metodo que regrese todos los comentarios de un proyecto
*/
