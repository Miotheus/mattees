var purchase = require('../models/purchase');

// Display list of all purchase.
exports.purchase_list = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase list');
};

// Display detail page for a specific purchase.
exports.purchase_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase detail: ' + req.params.id);
};

// Display purchase create form on GET.
exports.purchase_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase create GET');
};

// Handle purchase create on POST.
exports.purchase_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: purchase create POST');
};

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