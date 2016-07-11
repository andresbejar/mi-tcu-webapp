'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing'),
  Proyecto = mongoose.model('Proyecto');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Proyecto.find({}).remove(function(){
  Proyecto.create({
    codigo: 662,
    nombre: 'Mejorando la salud en Curridabat',
    descripcion: 'Test',
    area: 'Salud',
    carreras: ['Promocion de Salud', 'Farmacia', 'Medicina'],
    encargado: 'Carolina Boza',
    infoContacto: 'Tel: 8888888',
    rating: 5,
    cantidadRatings: 1,
    imagen: 'salud.jpg'
  });
  Proyecto.create({
    codigo: 662,
    nombre: 'Mejorando la salud en Curridabat',
    descripcion: 'Test',
    area: 'Salud',
    carreras: ['Promocion de Salud', 'Farmacia', 'Medicina'],
    encargado: 'Carolina Boza',
    infoContacto: 'Tel: 8888888',
    rating: 5,
    cantidadRatings: 1,
    imagen: 'salud.jpg'
  });
  Proyecto.create({
    codigo: 225,
    nombre: 'Apoyo a comunidades de Zona Sur',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'+
    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+
		'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo	consequat.',
    area: 'Salud',
    carreras: ['Promocion de Salud', 'Farmacia', 'Medicina'],
    encargado: 'Ricardo Fallas',
    infoContacto: 'Tel: 86634168',
    rating: 2,
    cantidadRatings: 1,
    imagen: 'ingenieria.jpg'
  });
  Proyecto.create({
    codigo: 264,
    nombre: 'Promoción del Desarrollo Sostenible y la Competitividad de las Organizaciones',
    descripcion: 'Apoyo a pequeñas y medianas empresas',
    area: 'Salud',
    carreras: ['Farmacia', 'Medicina'],
    encargado: 'Esteban Richmond',
    infoContacto: 'Tel: 60776125',
    rating: 2,
    cantidadRatings: 1,
    imagen: 'ingenieria.jpg'
  });
  Proyecto.create({
    codigo: 662,
    nombre: 'Promoción de la salud en niños de primaria',
    descripcion: 'Charlas y campañas en centros educativos',
    area: 'Salud',
    carreras: ['Promocion de Salud', 'Terapia Física', 'Medicina'],
    encargado: 'Glenda Porras',
    infoContacto: 'Tel: 70228920',
    rating: 3,
    cantidadRatings: 1,
    imagen: 'sociales.jpg'
  });
});
