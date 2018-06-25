var Client = require('../models/client');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all clients.
exports.client_list = function(req, res, next) {

  Client.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_clients) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('client_list', { title: 'Community', client_list: list_clients });
    });

};

// Display detail page for a specific shirt.
exports.client_detail = function(req, res, next) {

    async.parallel({
        client: function(callback) {

            Client.findById(req.params.id)
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.client==null) { // No results.
            var err = new Error('Client not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('client_detail', { name: 'Client', client:  results.client} );
    });

};


// Display Client create form on GET.
exports.client_create_get = function(req, res, next) {       
    res.render('client_form', { title: 'Sign up – Welcome to Mattees!' });
};

// Handle Client create on POST.
exports.client_create_post =  [
   
   
    body('first_name', 'Please, insert your name.').isLength({ min: 1 }).trim(),
    body('family_name', 'Please, insert your surname').isLength({ min: 1 }).trim(),
    body('address', 'Please, insert a valid address.').isLength({ min: 1 }),
    body('creditcard', 'Please, insert a valid credit card.').isLength({ min: 1 }),
    body('email', 'Please, insert a valid email.').isLength({ min: 1 }),
    body('password', 'Password must be at least 5 digits long.').isLength({ min: 1 }),

    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var client = new Client(
                {
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    address: req.body.address,
                    creditcard: req.body.creditcard,
                    email: req.body.email,
                    password: req.body.password
                });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('client_form', { title: 'Create Client', client: client, errors: errors.array()});
        return;
        }
        else {

            client.save(function (err) {
            if (err) { return next(err); }
            // Genre saved. Redirect to genre detail page.
            res.redirect(client.url);
                         });

                     }

                 
        }
    
];


// Display client delete form on GET.
exports.client_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: client delete GET');
};

// Handle client delete on POST.
exports.client_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: client delete POST');
};

// Display client update form on GET.
exports.client_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: client update GET');
};

// Handle client update on POST.
exports.client_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: client update POST');
};