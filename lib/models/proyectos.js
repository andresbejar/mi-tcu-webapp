'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

 var ProyectoSchema = new Schema({
	codigo: Number,
	name: String,
	descripcion: String,
	area: String,
	carreras: [String],
	encargado: String,
	infoContacto: String,
	rating: Number,
	cantidadRatings: Number,
	comentarios: [{type: Schema.Types.ObjectId, ref: 'Comentario'}]
 });

ProyectoSchema.virtual('info')
.get(function(){
	return {
		'nombre': this.codigo + this.name,
		'infoContacto': this.encargado + this.infoContacto
	};
});

ProyectoSchema.virtual('Rating').set(function(rating){
	this.rating -= this.rating / this.cantidadRatings;
	this.rating += rating / this.cantidadRatings;
	this.cantidadRatings++;

});

ProyectoSchema.path('rating').validate(function(num){
	return num >= 0 && num <= 5;
}, 'El rating no puede ser mayor que 5 estrellas');

 module.exports = mongoose.model('Proyecto', ProyectoSchema);

