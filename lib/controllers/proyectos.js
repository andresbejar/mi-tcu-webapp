'use strict';

var mongoose = require('mongoose'),
	Proyecto = mongoose.model('Proyecto');


/*
* Crear un nuevo proyecto de TCU
*/
exports.create = function(req, res){

	var proyecto = new Proyecto();
	proyecto.codigo = req.body.codigo;
	proyecto.nombre = req.body.nombre;
	proyecto.descripcion = req.body.descripcion;
	proyecto.area = req.body.area;
	proyecto.carreras = req.body.carreras;
	proyecto.encargado = req.body.encargado;
	proyecto.infoContacto = req.body.infoContacto;
	proyecto.rating = req.body.rating;
	proyecto.save(function(err){
		if(err)
			return res.json(400, err);
		else
			return res.json(proyecto);
	});
};

/*
* Obtener un proyecto
*/
exports.read = function(req, res){
	Proyecto.findById(req.params.id, function(err, proyecto){
		if(err)
			return res.send(err);
		if(!proyecto)
			return res.send(404);
		else
			return res.json(proyecto);
	});
};

/*
* Actualizar un proyecto
* TODO: arreglar
*/
exports.update = function(req, res){
	Proyecto.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, proyecto){
		if(err)
			return res.send(err);
		if(!proyecto)
			return res.send(404);
		else{
			res.json(proyecto); 
		}
	});
};

/*
* Borrar un proyecto
*/
exports.delete = function(req, res){
	Proyecto.findByIdAndRemove(req.params.id, function(err, proyecto){
		if(err)
			return res.send(err);
		if(!proyecto)
			return res.send(404);
		else
			return res.send(200);
	});
};

/*
* Obtener todos los proyectos
*/
exports.get = function(req, res){
	Proyecto.find(function(err, proyectos){
		if(!err)
			return res.json(proyectos);
		else
			return res.send(err);
	});
};

exports.addComment = function(req, res){
	Proyecto.findById(req.body.id, function(err, proyecto){
		if(err){
			return res.send(err);
		}
		if(!proyecto){
			return res.send(404);
		}
		else{
			proyecto.comentarios.push({
				'texto': req.body.texto,
				'autor': req.body.autor
			});
			proyecto.save(function(err){
				if(err){
					return res.send(err);
				}
				else{
					return res.json(proyecto);
				}
			});
		}
	});
};