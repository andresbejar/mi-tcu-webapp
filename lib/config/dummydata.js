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
    area: 'Ciencias de la Salud',
    carreras: ['Promocion de Salud', 'Farmacia', 'Medicina'],
    encargado: 'Carolina Boza',
    infoContacto: 'Tel: 8888888',
    rating: 5,
    cantidadRatings: 1,
    imagen: 'salud.jpg'
  });
  Proyecto.create({
    codigo: 537,
    nombre: '“Movimiento Humano y Recreación para una mejor calidad de vida de las poblaciones infantil, juvenil, adulta y adulta mayor en vulnerabilidad social ',
    descripcion: 'Fomentar el buen uso del tiempo libre, por medio de actividades recreativas como rally y fútbol tres en los habitantes de la comunidad de Salitre.',
    area: 'Ciencias de la Salud',
    carreras: ['Ciencias del Movimiento Humano', '', 'Medicina'],
    encargado: 'Cecilia Enith Romero',
    infoContacto: '',
    rating: 5 ,
    cantidadRatings: 1,
    imagen: 'salitre.jpg'
  });
  Proyecto.create({
    codigo: 225,
    nombre: 'Apoyo a comunidades de Zona Sur',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'+
    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+
    'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo	consequat.',
    area: 'Ciencias Sociales',
    carreras: ['Trabajo Social', 'Comunicación'],
    encargado: 'Ricardo Fallas',
    infoContacto: 'Tel: 86634168',
    rating: 2,
    cantidadRatings: 1,
    imagen: 'sociales.jpg'
  });
  Proyecto.create({
    codigo: 264,
    nombre: 'Promoción del Desarrollo Sostenible y la Competitividad de las Organizaciones',
    descripcion: 'Apoyo a pequeñas y medianas empresas de la zona de Batán y Upala',
    area: 'Ingeniería',
    carreras: ['Inegniería Mecánica', 'Ingeniería Química', 'Computación','Ingeniería Industrial'],
    encargado: 'Esteban Richmond',
    infoContacto: 'Tel: 60776125',
    rating: 2,
    cantidadRatings: 4,
    imagen: 'ingenieria.jpg'
  });
  Proyecto.create({
    codigo: 352,
    nombre: 'Promoción de la salud en niños de primaria',
    descripcion: 'Charlas y campañas en centros educativos',
    area: 'Ciencias de la Salud',
    carreras: ['Promocion de Salud', 'Terapia Física', 'Medicina'],
    encargado: 'Glenda Porras',
    infoContacto: 'Tel: 70228920',
    rating: 3,
    cantidadRatings: 1,
    imagen: 'sociales.jpg'
  });
  Proyecto.create({
    codigo: 619,
    nombre: 'Aprovechando tu tiempo para formar un Futuro: Un Aprendizaje sobre derechos en la niñez',
    descripcion: 'Responder a las necesidades de la población universitaria de recibir capacitación y adquirir conocimientos del derecho universal de acceso a salud',
    area: 'Ciencias de la Salud',
    carreras: ['Electrografía', 'Emergencias Médicas'],
    encargado: 'Lang Ying Hernández',
    infoContacto: 'Email: lang.hernandezchevez@ucr.ac.cr',
    rating: 3,
    cantidadRatings: 1,
    imagen: 'primerosauxilios.jpg'
  });
  Proyecto.create({
    codigo: 592,
    nombre: 'Programa capacitación económica y social a las comunidades y microempresarios de la zona de Guanacaste',
    descripcion: 'Realización de sesiones sobre temas ambientales y de mejora comunal. Actividades como: cuido de las tortugas y charlas sobre el manejo de los recursos naturales',
    area: 'Ingeniería',
    carreras: ['Ingeniería Ambiental', 'Ingeniería Química'],
    encargado: 'Guido Salas Navarrete',
    infoContacto: '-',
    rating: 5,
    cantidadRatings: 1,
    imagen: 'guanacaste.jpg'
  });
  Proyecto.create({
    codigo: 584,
    nombre: 'Protección agroalimentaria para comunidades suburbanas y rurales de Guanacaste',
    descripcion: '',
    area: 'Ciencias Agroalimentarias',
    carreras: ['Ingeniería de Alimentos', 'Agronomía'],
    encargado: 'John Doe',
    infoContacto: '-',
    rating: 4,
    cantidadRatings: 1,
    imagen: 'agro.jpg'
  });
  Proyecto.create({
    codigo: 588,
    nombre: 'Promoción de habilidades socioafectivas y cognitivas por medio de la lectura de cuentos',
    descripcion: 'Realización de sesiones sobre temas ambientales y de mejora comunal. Actividades como: cuido de las tortugas y charlas sobre el manejo de los recursos naturales',
    area: 'Artes y Letras',
    carreras: ['Filología española', 'Artes Dramáticas'],
    encargado: 'Hugo Lopez',
    infoContacto: '-',
    rating: 4,
    cantidadRatings: 1,
    imagen: '588.jpg'
  });
  Proyecto.create({
    codigo: 656,
    nombre: 'Educación y acción ambiental en las comunidades guanacastecas',
    descripcion: 'Realización de sesiones sobre temas ambientales y de mejora comunal. Actividades como: cuido de las tortugas y charlas sobre el manejo de los recursos naturales',
    area: 'Ingeniería',
    carreras: ['Ingeniería Ambiental', 'Ingeniería Química'],
    encargado: 'Guillermo Cortés',
    infoContacto: '-',
    rating: 3,
    cantidadRatings: 1,
    imagen: '656.png'
  });
  Proyecto.create({
    codigo: 519,
    nombre: 'Calle de la Amargura hacia una renovación física, recreativa y cultural',
    descripcion: 'Realización de ferias orgánicas, actividades recreativas y culturales, como juegos tradicionales.',
    area: 'Ciencias Básicas',
    carreras: ['Biología', 'Física'],
    encargado: 'Karla Barrantes',
    infoContacto: 'Tel: 2511-2784',
    rating: 5,
    cantidadRatings: 1,
    imagen: 'calle.jpg'
  });
  Proyecto.create({
    codigo: 486,
    nombre: 'Tradiciones de Costa Rica',
    descripcion: 'Compilar y compartir tradiciones de Costa Rica con la participación de personas adultas mayores.',
    area: 'Ciencias Básicas',
    carreras: ['Geología', 'Matemática'],
    encargado: 'Patricia Sedó',
    infoContacto: '-',
    rating: 5,
    cantidadRatings: 1,
    imagen: 'tradiciones.jpg'
  });
});
