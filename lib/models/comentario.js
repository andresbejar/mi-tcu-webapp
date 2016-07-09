'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var ComentarioSchema = new Schema({
	autor: {
		nombre: String,
		id: {type: Schema.Types.ObjectId, ref: 'User'}
	},
	proyecto: {type: Schema.Types.ObjectId, ref: 'Proyecto'},
	contenido: String,
	fecha: { type: Date, default: Date.now }
});

ComentarioSchema.virtual('info').get(function(){
	return {
		'autor': this.autor.nombre,
		'contenido': this.contenido,
		'fecha': this.fecha
	};
});


module.exports = mongoose.model('Comentario', ComentarioSchema);