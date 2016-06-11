'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

 var ComentarioSchema = new Schema({
 	id: Schema.Types.ObjectId,
 	Usuario: {type: Schema.Types.ObjectId, ref: 'User'},
 	Proyecto: {type: Schema.Types.ObjectId, ref: 'Proyecto'},
 	contenido: String,
 	fecha: { type: Date, default: Date.now }
 });

 module.exports = mongoose.model('Comentario', ComentarioSchema);