var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PurchaseSchema = new Schema(
  {
    shirt: { type: Schema.ObjectId, ref: 'Shirt', required: true }, //reference to the associated shirt
    client: { type: Schema.ObjectId, ref: 'Client', required: true },
    date: {type: Date, default: Date.now},
    size: {type: String, required: true, enum: ['P', 'M', 'G'], default: 'M'},
  }
);

// Virtual for purchase's URL
PurchaseSchema
.virtual('url')
.get(function () {
  return '/catalog/purchase/' + this._id;
});

//Export model
module.exports = mongoose.model('Purchase', PurchaseSchema);