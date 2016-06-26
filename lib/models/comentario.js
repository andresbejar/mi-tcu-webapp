'use strict';

//===========================================================================
// NOTA: Esta entidad esta deprecada. Para insertar comentarios ver Proyecto
//===========================================================================


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var ComentarioSchema = new Schema({
	autor: String,
	proyecto: {type: Schema.Types.ObjectId, ref: 'Proyecto'},
	contenido: String,
	fecha: { type: Date, default: Date.now }
});

ComentarioSchema.virtual('info').get(function(){
	return {
		'autor': this.autor,
		'contenido': this.contenido,
		'fecha': this.fecha
	};
});


module.exports = mongoose.model('Comentario', ComentarioSchema);