var express = require('express');
var router = express.Router();

// Require controller modules.
var shirt_controller = require('../controllers/shirtController');
var client_controller = require('../controllers/clientController');
var purchase_controller = require('../controllers/purchaseController');
var shirt_instance_controller = require('../controllers/shirtinstanceController');

/// shirt ROUTES ///

// GET catalog home page.
router.get('/', shirt_controller.index);

// GET request for creating a shirt. NOTE This must come before routes that display shirt (uses id).
router.get('/shirt/create', shirt_controller.shirt_create_get);

// POST request for creating shirt.
router.post('/shirt/create', shirt_controller.shirt_create_post);

// GET request to delete shirt.
router.get('/shirt/:id/delete', shirt_controller.shirt_delete_get);

// POST request to delete shirt.
router.post('/shirt/:id/delete', shirt_controller.shirt_delete_post);

// GET request to update shirt.
router.get('/shirt/:id/update', shirt_controller.shirt_update_get);
// POST request to update shirt.
router.post('/shirt/:id/update', shirt_controller.shirt_update_post);

// GET request for one shirt.
router.get('/shirt/:id', shirt_controller.shirt_detail);

// GET request for list of all shirt items.
router.get('/shirts', shirt_controller.shirt_list);

/// client ROUTES ///

// GET request for creating client. NOTE This must come before route for id (i.e. display client).
router.get('/client/create', client_controller.client_create_get);

// POST request for creating client.
router.post('/client/create', client_controller.client_create_post);

// GET request to delete client.
router.get('/client/:id/delete', client_controller.client_delete_get);

// POST request to delete client.
router.post('/client/:id/delete', client_controller.client_delete_post);

// GET request to update client.
router.get('/client/:id/update', client_controller.client_update_get);

// POST request to update client.
router.post('/client/:id/update', client_controller.client_update_post);

// GET request for one client.
router.get('/client/:id', client_controller.client_detail);

// GET request for list of all clients.
router.get('/clients', client_controller.client_list);

/// purchase ROUTES ///

// GET request for creating a purchase. NOTE This must come before route that displays purchase (uses id).
router.get('/purchase/create', purchase_controller.purchase_create_get);

//POST request for creating purchase.
router.post('/purchase/create', purchase_controller.purchase_create_post);

// GET request to delete purchase.
router.get('/purchase/:id/delete', purchase_controller.purchase_delete_get);

// POST request to delete purchase.
router.post('/purchase/:id/delete', purchase_controller.purchase_delete_post);

// GET request to update purchase.
router.get('/purchase/:id/update', purchase_controller.purchase_update_get);

// POST request to update purchase.
router.post('/purchase/:id/update', purchase_controller.purchase_update_post);

// GET request for one purchase.
router.get('/purchase/:id', purchase_controller.purchase_detail);

// GET request for list of all purchase.
router.get('/purchases', purchase_controller.purchase_list);

/// shirtINSTANCE ROUTES ///

// GET request for creating a shirtInstance. NOTE This must come before route that displays shirtInstance (uses id).
router.get('/shirtinstance/create', shirt_instance_controller.shirtinstance_create_get);

// POST request for creating shirtInstance. 
router.post('/shirtinstance/create', shirt_instance_controller.shirtinstance_create_post);

// GET request to delete shirtInstance.
router.get('/shirtinstance/:id/delete', shirt_instance_controller.shirtinstance_delete_get);

// POST request to delete shirtInstance.
router.post('/shirtinstance/:id/delete', shirt_instance_controller.shirtinstance_delete_post);

// GET request to update shirtInstance.
router.get('/shirtinstance/:id/update', shirt_instance_controller.shirtinstance_update_get);

// POST request to update shirtInstance.
router.post('/shirtinstance/:id/update', shirt_instance_controller.shirtinstance_update_post);

// GET request for one shirtInstance.
router.get('/shirtinstance/:id', shirt_instance_controller.shirtinstance_detail);

// GET request for list of all shirtInstance.
router.get('/shirtinstances', shirt_instance_controller.shirtinstance_list);

module.exports = router;