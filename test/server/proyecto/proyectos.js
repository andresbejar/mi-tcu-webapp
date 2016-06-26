'use strict';
var mongoose = require('mongoose'),
	should = require('should'),
	ProyectoSchema = require('../../../lib/models/proyecto'),
	Proyecto = mongoose.model('Proyecto', ProyectoSchema);

var proyecto;

describe('Modelo de proyecto', function(){

	//esto se corre antes de la prueba
	before(function(done){
		proyecto = new Proyecto({
			codigo: 662,
		    nombre: 'Mejorando la salud en Curridabat',
		    descripcion: 'Test',
		    area: 'Salud',
		    carreras: ['Promocion de Salud', 'Farmacia', 'Medicina'],
		    encargado: 'Carolina Boza',
		    infoContacto: 'tel: 8888888',
		    _rating: 5,
		    cantidadRatings: 1
		});

		//se limpian todos los proyectos
		Proyecto.remove().exec();
		done();
	});

	afterEach(function(done){
		Proyecto.remove().exec();
		done();
	});

	//una prueba basica
	it('should have no proyects on the db', function(done){
		Proyecto.find({}, function(err, proyectos){
			proyectos.should.have.length(0);
			done();
		});
	});

	it('should return project info', function(done){
		proyecto.save();
		proyecto.info.nombre.should.equal('662: Mejorando la salud en Curridabat');
		done();
	});

	it('should fail if rating is more than 5', function(done){
		proyecto._rating = 6;
		proyecto.save(function(e){
			should.exist(e);
			done();
		});
	});

	it('should allow to set ratings', function(done){
		proyecto.rating = 4;
		proyecto.save(function(e){
			should.not.exist(e);
			done();
		});
	});

	it('should give a correct rating average', function(done){
		proyecto._rating = 5; //para quitar el 6 de la prueba pasada
		proyecto.cantidadRatings = 1;
		proyecto.rating = 4;
		proyecto.save();
		proyecto.rating.should.equal(4.5);
		done();
	});

});