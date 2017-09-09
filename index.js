
var ApiBuilder = require('claudia-api-builder'),  
  

api = new ApiBuilder();


api.get('/', function () {  
  'use strict';
  return 'Hello World';
});








module.exports = api;
