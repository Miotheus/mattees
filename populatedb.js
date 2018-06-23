#! /usr/bin/env node

console.log('This script populates some test shirts, client, purchases and shirtinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Shirt = require('./models/shirt')
var ShirtInstance = require('./models/shirtinstance')
var Client = require('./models/client')
var Purchase = require('./models/purchase')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var clients = []
var purchases = []
var shirts = []
var shirtinstances = []

function clientCreate(first_name, family_name, address, creditcard, email, password, cb) {
  clientdetail = {first_name:first_name , family_name: family_name, address: address, creditcard: creditcard, email: email, password: password }
  
  var client = new Client(clientdetail);
       
  client.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Client: ' + client);
    clients.push(client)
    cb(null, client)
  }  );
}

function ShirtCreate(name, brand, season, cb) {
  shirtdetail = { 
    name: name,
    brand: brand,
    season: season,
  }
    
  var shirt = new Shirt(shirtdetail);    
  shirt.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Shirt: ' + shirt);
    shirts.push(shirt)
    cb(null, shirt)
  }  );
}


function shirtInstanceCreate(shirt, status, cb) {
  shirtinstancedetail = { 
    shirt: shirt,
    status: status
  }    

  if (status != false) shirtinstancedetail.status = status
    
  var shirtinstance = new ShirtInstance(shirtinstancedetail);    
  shirtinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING ShirtInstance: ' + shirtinstance);
      cb(err, null)
      return
    }
    console.log('New ShirtInstance: ' + shirtinstance);
    shirtinstances.push(shirtinstance)
    cb(null, shirt)
  }  );
}


function createClient(cb) {
    async.parallel([
        function(callback) {
          clientCreate('Cecil', 'Baldwin', 'Night Vale St.', '66666','cecilb@nightvale.com', 12345 , callback);
        }
        ],
        // optional callback
        cb);
}


function createShirts(cb) {
    async.parallel([
        function(callback) {
          ShirtCreate('Black Shirt', 'Renner', 'Spring', callback);
        }
        ],
        // optional callback
        cb);
}


function createShirtInstances(cb) {
    async.parallel([
        function(callback) {
          shirtInstanceCreate(shirts[0], 'Available', callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createClient,
    createShirts,
    createShirtInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('SHIRTInstances: '+shirtinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
