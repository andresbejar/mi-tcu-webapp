'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    proyectos = require('./controllers/proyectos'),
    filemanager = require('./controllers/upload');

var middleware = require('./middleware');

/**
 * Application routes
 * Vamos a usar verbos HTTP para que sea puro RESTful
 */
module.exports = function(app) {

  // Rutas del servidor

  app.post('/api/upload', middleware.auth, filemanager.upload);

  //API para operaciones IMEC en proyectos
  app.get('/api/proyectos', proyectos.get);
  app.post('/api/proyectos', middleware.auth, proyectos.create);
  app.get('/api/proyectos/:id', proyectos.read);
  app.del('/api/proyectos/:id', middleware.auth, proyectos.delete);
  app.put('/api/proyectos/:id', middleware.auth, proyectos.update);
  app.post('/api/proyectos/rating', middleware.auth, proyectos.addRating);

  //API para busqueda de proyectos
  app.get('/api/area', proyectos.buscarPorArea);

  //API para operaciones IMEC en comentarios
  app.put('/api/comentarios', middleware.auth, proyectos.addComment); //La ruta se puede cambiar
  app.get('/api/comentarios/:id', proyectos.getComments);
  app.del('/api/comentarios/:id', middleware.auth, proyectos.deleteComment);

  //API para operaciones IMEC en usuarios
  app.post('/api/users', middleware.auth, users.create);
  app.put('/api/users', middleware.auth, users.changePassword);
  app.get('/api/users/me', middleware.auth, users.me);
  app.put('/api/users/tcu', middleware.auth, users.addTcu);
  app.put('/api/users/me', middleware.auth, users.update);

  //API para operaciones usuario-proyecto
  app.put('/api/users/proyecto', middleware.auth, users.seguirProyecto);
  app.get('/api/users/proyecto/:id', middleware.auth, users.getProyecto);

  app.get('/api/users/:id', middleware.auth, users.show);
  
  

  app.get('/api/users/follows/:id', middleware.auth, users.getFollows);



  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};