var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShirtInstanceSchema = new Schema(
  {
    shirt: { type: Schema.ObjectId, ref: 'Shirt', required: true }, //reference to the associated shirt
    status: {type: String, required: true, enum: ['Available', 'Out-of-stock'], default: 'Available'},
  }
);

// Virtual for bookinstance's URL
ShirtInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/shirtinstance/' + this._id;
});

//Export model
module.exports = mongoose.model('ShirtInstance', ShirtInstanceSchema);