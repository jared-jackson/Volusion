var ApiBuilder = require('claudia-api-builder');
var RSVP = require('rsvp');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var api = new ApiBuilder();


api.get('/', function () {
    'use strict';
    var string = 'THIS IS OUR AMAZING TEST STRING';


        return new RSVP.Promise(function(resolve, reject) {
            var nlu = new NaturalLanguageUnderstandingV1({
                username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
                password: 'JBAtZWNXWqy6',
                version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
            });
            var test = {};
            nlu.analyze({
                'html': string, // Buffer or String
                'features': {
                    'concepts': {},
                    'keywords': {},
                    'emotion': {}
                }
            }, function (err, response) {
                if (err) {
                    reject(err);
                } else {
                    test = response.emotion.document.emotion;
                    resolve(test);
                }
            });
        });






}, {success: {contentType: 'application/json'}});


module.exports = api;
