var Shirt = require('../models/shirt');
var Client = require('../models/client');
var Purchase = require('../models/purchase');
var ShirtInstance = require('../models/shirtinstance');

var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all purchase.
exports.purchase_list = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase list');
};

exports.purchase_detail = function(req, res, next) {

    async.parallel({
        purchase: function(callback) {

            Purchase.findById(req.params.id)
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.purchase==null) { // No results.
            var err = new Error('purchase not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('purchase_detail', { name: 'purchase', purchase:  results.purchase} );
    });

};

// Display book create form on GET.
exports.purchase_create_get = function(req, res, next) { 
      
    // Get all authors and genres, which we can use for adding to our book.
    async.parallel({
        shirts: function(callback) {
            Shirt.find(callback);
        },
        clients: function(callback) {
            Client.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('purchase_form', { title: 'Purchase', shirts: results.shirts, clients: results.clients });
    });
    
};
// Handle book create on POST.
exports.purchase_create_post = [

    // Validate fields.
   // body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
    body('client', 'Client must not be empty.').isLength({ min: 1 }).trim(),
  //  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  //  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),
  
    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var purchase = new Purchase(
          { shirt: req.body.shirt,
            client: req.body.client,
            date: req.body.date,
            size: req.body.size,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                shirts: function(callback) {
                    Shirt.find(callback);
                },
                clients: function(callback) {
                    Client.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('purchase_form', { title: 'Purchase',shirts:results.shirts, authors:results.authors, purchase: purchase, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save book.
            purchase.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new book record.
                   res.redirect(purchase.url);
                });
        }
    }
];

// Display purchase delete form on GET.
exports.purchase_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase delete GET');
};

// Handle purchase delete on POST.
exports.purchase_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase delete POST');
};

// Display purchase update form on GET.
exports.purchase_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase update GET');
};

// Handle purchase update on POST.
exports.purchase_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase update POST');
};