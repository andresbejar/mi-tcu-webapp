'use strict';

var mongoose = require('mongoose'),
	Proyecto = mongoose.model('Proyecto'),
	Comentario = mongoose.model('Comentario'),
	User = mongoose.model('User');

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
		else{
			Comentario.remove({ _id: { $in: proyecto.comentarios } }, function(err){
				if(err){
					return res.send(err);
				}
			});

			User.update(
				{follows: proyecto._id},
				{$pull: {follows: proyecto._id }},
				function(err, numAffected){
					if(err){
						res.send(err);
					}
					else{
						res.send(200);
					}
				}
			);

		}
	});
};

/*
* Obtener todos los proyectos
*/
exports.get = function(req, res){
	Proyecto.find(function(err, proyectos){
		if(err)
			return res.send(err);
		if(!proyectos)
			return res.send(404);
		else
			return res.json(proyectos);
	});
};


exports.addRating = function(req, res){
	Proyecto.findById(req.body.id, function(err, proyecto){
		if(err){
			return res.send(err);
		}
		if(!proyecto){
			return res.send(404);
		}
		else{
			proyecto.rating = req.body.rating;
			proyecto.save(function(err){
				if(err)
					return res.send(err);
				else
					return res.json(proyecto);
			});
		}
	});
};

exports.buscarPorArea = function(req, res){
	console.log(req.query.area);
	Proyecto.find({area : req.query.area }, function(err, proyectos){
		if(err){
			return res.send(err);
		}
		if(!proyectos){
			return res.send(404);
		}
		else{
			return res.json(proyectos);
		}
	});
};

exports.addComment = function(req, res){
	var comentario = new Comentario();
	comentario.autor.nombre = req.body.autor; //cambiar esto por req.user.nombre
	comentario.autor.id = req.body.autorID; //cambiar esto por req.user._id
	comentario.proyecto = req.body.proyectoId; //OJO
	comentario.contenido = req.body.contenido;
	comentario.save(function(err){
		if(err)
			return res.json(400, err);
		else
			Proyecto.findById(req.body.proyectoId, function(err, proyecto){
				if(err){
					return res.send(err);
				}
				if(!proyecto){
					return res.send(404);
				}
				else{
					proyecto.comentarios.push(comentario._id);
					proyecto.save(function(err){
						if(err){
							return res.send(err);
						}
						else{
							return res.send(200);
						}
					});	
				}
			});
	});
};

exports.getComments = function(req, res){
	Proyecto.findById(req.params.id).populate('comentarios').exec(function(err, proyecto){
		if(err){
			return res.send(err);
		}
		if(!proyecto){
			return res.send(404);
		}
		else{
			return res.json(proyecto.comentarios);
		}
	});
};

exports.deleteComment = function(req, res){
	Comentario.findByIdAndRemove(req.params.id, function(err, comentario){
		if(err){
			return res.send(err);
		}
		if(!comentario){
			return res.send(404);
		}
		else{
			Proyecto.update(
				{ _id: comentario.proyecto },
				{$pull: {comentarios: comentario._id }},
				function(err, numAffected){
					if(err){
						return res.send(err);
					}
					else{
						return res.send(200);
					}
				}
			);
		}
	});
};
