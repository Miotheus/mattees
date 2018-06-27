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

function ShirtCreate(name, brand, season, price, image, fabric, colour, cb) {
  shirtdetail = { 
    name: name,
    brand: brand,
    season: season,
    price: price,
    image: image,
    fabric: fabric,
    colour: colour,
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
          clientCreate('Sherlock', 'Holmes', 'Baker Street 221B', '124124','sherlock@holmes.com', 533431 , callback);
          clientCreate('Luke', 'Skywalker', 'Night Vale St.', '3333','luke@jedi.com', 43531 , callback);
          clientCreate('Edmond', 'Dantes', 'Chateau diff', '4242','edmond@countofmontecristo.com', 33333 , callback)
        }
        ],
        // optional callback
        cb);
}


function createShirts(cb) {
    async.parallel([
        function(callback) {
          ShirtCreate('Black Shirt', 'Renner', 'Spring', 100, 'https://images.unsplash.com/photo-1509129823085-3bf323eab856?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6745bcdebd15a3da5681e7985b8d9571&auto=format&fit=crop&w=1950&q=80', 'Cotton', 'Black', callback);
          ShirtCreate('White Shirt', 'Armani', 'Winter', 150, 'https://images.unsplash.com/photo-1490087763596-862a8bfcc16c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc679617a5a1cea43d0acc459dd5ba5a&auto=format&fit=crop&w=1350&q=80', 'Silk', 'White', callback);
          ShirtCreate('Red Shirt', 'Gucci', 'Summer', 200, 'https://images.unsplash.com/photo-1510687721185-21a8e732fe6f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f47f4dd34c85401ccf10383778f7ad27&auto=format&fit=crop&w=1351&q=80', 'Polyester', 'Red', callback);
          ShirtCreate('Skeleton Shirt', 'Hering', 'Autumn', 70, 'https://images.unsplash.com/photo-1503341338985-c0477be52513?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a58c0c0de6c75c2fb31c67f49ebf37a&auto=format&fit=crop&w=1350&q=80', 'Silk', 'Black', callback);
          ShirtCreate('Resilient Shirt', 'Renner', 'Summer', 120, 'https://images.unsplash.com/photo-1526444993807-89612851ea2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c133e6db8e7c8005a58b0c9fa985ebff&auto=format&fit=crop&w=1350&q=80', 'Cotton', 'White', callback)
        }
        ],
        // optional callback
        cb);
}


function createShirtInstances(cb) {
    async.parallel([
        function(callback) {
          shirtInstanceCreate(shirts[0], 'Available', callback);
          shirtInstanceCreate(shirts[1], 'Available', callback);
          shirtInstanceCreate(shirts[2], 'Available', callback);
          shirtInstanceCreate(shirts[3], 'Available', callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createShirts,
    createClient,
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
