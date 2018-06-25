var shirtInstance = require('../models/shirtinstance');

// Display list of all BookInstances.
exports.shirtinstance_list = function(req, res, next) {

  shirtInstance.find()
    .populate('shirt')
    .exec(function (err, list_shirtinstances) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('shirtinstance_list', { title: 'Status', shirtinstance_list: list_shirtinstances });
    });
    
};

// Display detail page for a specific shirtInstance.
exports.shirtinstance_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: shirtInstance detail: ' + req.params.id);
};

// Display shirtInstance create form on GET.
exports.shirtinstance_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: shirtInstance create GET');
};

// Handle shirtInstance create on POST.
exports.shirtinstance_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: shirtInstance create POST');
};

// Display shirtInstance delete form on GET.
exports.shirtinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: shirtInstance delete GET');
};

// Handle shirtInstance delete on POST.
exports.shirtinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: shirtInstance delete POST');
};

// Display shirtInstance update form on GET.
exports.shirtinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: shirtInstance update GET');
};

// Handle shirtinstance update on POST.
exports.shirtinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: shirtInstance update POST');
};