var ApiBuilder = require('claudia-api-builder');
var denodeify = require('denodeify');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var api = new ApiBuilder();


api.get('/', function (req, res) {
    'use strict';
    var string = " THIS IS OUR AMAZING TEXT STRING";


    var exec = denodeify(function(err, req, res) {
        return "here is an asynchronous return string";
    });

    exec().then(function(results) {

            return results;

        });






}, {success: {contentType: 'application/json'}});


module.exports = api;
