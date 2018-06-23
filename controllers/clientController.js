var client = require('../models/client');

// Display list of all clients.
exports.client_list = function(req, res) {
    res.send('NOT IMPLEMENTED: client list');
};

// Display detail page for a specific client.
exports.client_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
};

// Display client create form on GET.
exports.client_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: client create GET');
};

// Handle client create on POST.
exports.client_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: client create POST');
};

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