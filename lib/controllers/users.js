'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');

/**
 * Create user
 */
//PUT
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err) {
    if (err) return res.json(400, err);
    
    req.logIn(newUser, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  Get profile of specified user
 */
 //GET
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({ profile: user.profile });
  });
};

/**
 * Change password
 */
 //POST
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get current user
 */
 //GET
exports.me = function(req, res) {
  res.json(req.user || null);
};

//POST
exports.addTcu = function(req, res){
  User.findById(req.body.id, function(err, user){
    if(err){
      return res.send(err);
    }
    if(!user){
      return res.send(404);
    }
    else{
      user.tcuMatriculado = req.body.tcuID; //OJO
      user.save(function(err){
        if(err)
          return res.send(err);
        else
          return res.json({ profile: user.profile });
      });
    }
  });
};

//POST
exports.update = function(req, res){
  User.findById(req.user._id, function(err, user){
    if(err){
      return res.send(err);
    }
    if(!user){
      return res.send(404);
    }
    else{

      if(req.body.email)
        user.email = req.body.email;
      if(req.body.tcuID)  
        user.tcuMatriculado = req.body.tcuID;
      if(req.body.edad)
        user.personalInfo.edad = req.body.edad;
      if(req.body.carrera)
        user.personalInfo.carrera = req.body.carrera;
      if(req.body.about)
        user.personalInfo.about = req.body.about;

      user.save(function(err){
        if(err){
          return res.send(err);
        }
        else{
          return res.json({ profile: user.profile });
        }
      });
    }
  });

};

//GET
exports.getProyecto = function(req, res){

    User.findById(req.params.id).populate('tcuMatriculado').exec(function(err, user){
      if(err){
        return res.send(err);
      }
      if(!user){
        return res.send(404);
      }
      else{

        if(user.tcuMatriculado){
          return res.json({
            _id: user.tcuMatriculado._id,
            nombre: user.tcuMatriculado.nombre,
            codigo: user.tcuMatriculado.codigo
          });
        }
        else{
          return res.json({
            error: 'No hay un TCU matriculado'
          });
        }

      }
    });

};


//POST
exports.seguirProyecto = function(req, res){
  User.findById(req.body.id, function(err, user){
    if(err){
      return res.send(err);
    }
    if(!user){
      return res.send(404);
    }
    else{
      user.follows.push(req.body.proyectoId);
      user.save(function(err){

        if(err){
          return res.send(err);
        }
        else{
          return res.send(200);
        }

      });
    }
  });
};

//GET
//experimental, en teoria podria ver los proyectos a los que el usuario le hace follow
exports.getFollows = function(req, res){
  User.findById(req.params.id).populate('follows').exec(function(err, user){
    if(err){
      return res.send(err);
    }
    if(!user){
      return res.send(404);
    }
    else{
      var follows = [];
      for (var i = 0; i < user.follows.length; i++) {
        follows.push({
          _id: user.follows[i]._id,
          nombre: user.follows[i].nombre,
          codigo: user.follows[i].codigo
        });
      }
      return res.json(follows);
    }
  });
};