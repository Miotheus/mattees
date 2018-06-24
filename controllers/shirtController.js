var Shirt = require('../models/shirt');
var Client = require('../models/client');
var Purchase = require('../models/purchase');
var ShirtInstance = require('../models/shirtinstance');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        shirt_count: function(callback) {
            Shirt.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        shirt_instance_count: function(callback) {
            ShirtInstance.count({}, callback);
        },
        shirt_instance_available_count: function(callback) {
            ShirtInstance.count({status:'Available'}, callback);
        },
        client_count: function(callback) {
            Client.count({}, callback);
        },
        purchase_count: function(callback) {
            Purchase.count({}, callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Mattees', error: err, data: results });
    });
};

// Display list of all Shirts.
exports.shirt_list = function(req, res, next) {

  Shirt.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_shirts) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('shirt_list', { title: 'Shirt List', shirt_list: list_shirts });
    });

};

// Display list of all Shirts.
exports.brand_list = function(req, res, next) {

  Shirt.find()
    .sort([['brand', 'ascending']])
    .exec(function (err, list_shirts) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('shirt_list', { title: 'Shirt List', shirt_list: list_shirts });
    });

};
// Display detail page for a specific shirt.
exports.shirt_detail = function(req, res, next) {

    async.parallel({
        shirt: function(callback) {

            Shirt.findById(req.params.id)
              .exec(callback);
        },
        
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.shirt==null) { // No results.
            var err = new Error('Shirt not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('shirt_detail', { name: 'Shirt', shirt:  results.shirt} );
    });

};



// Display shirt create form on GET.
exports.shirt_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: shirt create GET');
};

// Handle shirt create on POST.
exports.shirt_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: shirt create POST');
};

// Display shirt delete form on GET.
exports.shirt_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: shirt delete GET');
};

// Handle shirt delete on POST.
exports.shirt_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: shirt delete POST');
};

// Display shirt update form on GET.
exports.shirt_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: shirt update GET');
};

// Handle shirt update on POST.
exports.shirt_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: shirt update POST');
};

