var ApiBuilder = require('claudia-api-builder');
var async = require('async');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var api = new ApiBuilder();


api.get('/', function (req, res) {
    'use strict';
    var string = " THIS IS OUR AMAZING TEXT STRING";

    async.waterfall(
        [
            function (callback) {
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
                        console.log('error:', err);
                    } else {
                        test = response.emotion.document.emotion;
                        callback(null, "THIS", 'There was an error processing the language text.');
                    }

                });
            }

        ],
        function (err, insights) {
            return insights;
            //res.status(200).send(insights);
        }
    );

    return "test";


});


module.exports = api;
