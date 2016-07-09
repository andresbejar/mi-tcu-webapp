'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    proyectos = require('./controllers/proyectos');

var middleware = require('./middleware');

/**
 * Application routes
 * Vamos a usar verbos HTTP para que sea puro RESTful
 */
module.exports = function(app) {

  // Rutas del servidor
  app.get('/api/awesomeThings', api.awesomeThings); //esto se va a quitar, ya no ocupamos las things


  //API para operaciones IMEC en proyectos
  app.get('/api/proyectos', proyectos.get);
  app.post('/api/proyectos', proyectos.create);
  app.get('/api/proyectos/:id', proyectos.read);
  app.del('/api/proyectos/:id', proyectos.delete);
  app.put('/api/proyectos/:id', proyectos.update);
  app.post('/api/proyectos/rating', proyectos.addRating);

  //API para busqueda de proyectos
  app.get('/api/area', proyectos.buscarPorArea);

  //API para operaciones IMEC en comentarios
  app.put('/api/comentarios', proyectos.addComment); //La ruta se puede cambiar
  app.get('/api/comentarios/:id', proyectos.getComments);
  app.del('/api/comentarios/:id', proyectos.deleteComment);

  //API para operaciones IMEC en usuarios
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);
  app.put('/api/users/tcu', users.addTcu);
  app.put('/api/users/me', users.update);

  //API para operaciones usuario-proyecto
  app.post('/api/users/proyecto', users.seguirProyecto);
  app.get('/api/users/proyecto/:id', users.getProyecto);

  app.get('/api/users/follows/:id', users.getFollows);


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