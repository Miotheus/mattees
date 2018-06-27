var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShirtSchema = new Schema(
  {
    name: {type: String, required: true,  max: 100},
    brand: {type: String, required: true, enum: ['Gucci', 'Armani', 'Supreme', 'Renner', 'Hering'], default: 'Renner'},
    season: {type: String, required: true, enum: ['Spring', 'Winter', 'Summer', 'Autumn'], default: 'Spring'},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    fabric: {type: String, required: true, enum: ['Cotton', 'Linen', 'Silk', 'Polyester', 'Satin'], default: 'Cotton'},
    colour: {type: String, required: true},
  }
);

// Virtual for shirt's URL
ShirtSchema
.virtual('url')
.get(function () {
  return '/catalog/shirt/' + this._id;
});

//Export model
module.exports = mongoose.model('Shirt', ShirtSchema);

//Price is missing
// Colour
//
//Fabric