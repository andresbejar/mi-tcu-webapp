'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var ProyectoSchema = new Schema({
	codigo: Number,
	nombre: String,
	descripcion: String,
	area: String,
	carreras: [String],
	encargado: String,
	infoContacto: String,
	_rating: Number,
	cantidadRatings: { type: Number, default: 0 },
	comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario'}],
  imagen: String
});

ProyectoSchema.virtual('info')
.get(function(){
	return {
		'nombre': this.codigo + ': ' + this.nombre,
		'descripcion': this.descripcion
	};
});

ProyectoSchema.virtual('rating').set(function(rating){
	this.cantidadRatings++;
	if(this._rating){
		this._rating -= this._rating / this.cantidadRatings;
		this._rating += rating / this.cantidadRatings;
	}
	else{
		this._rating = rating;
	}

}).get(function(){
	return this._rating;
});

ProyectoSchema.path('_rating').validate(function(num){
	return num >= 0 && num <= 5;
}, 'El rating no puede ser mayor que 5 estrellas');


module.exports = mongoose.model('Proyecto', ProyectoSchema);
