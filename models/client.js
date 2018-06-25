var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, max: 100},
    address: {type: String, required: true, max: 100},
    creditcard: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    password: {type: String, required: true},
  }
);

// Virtual for client's full name
ClientSchema
.virtual('name')
.get(function () {
  return this.first_name + ', ' + this.family_name;
});

// Virtual for client's URL
ClientSchema
.virtual('url')
.get(function () {
  return '/catalog/profile/' + this._id;
});

//Export model
module.exports = mongoose.model('Client', ClientSchema);