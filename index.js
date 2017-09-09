'use strict';
var ApiBuilder = require('claudia-api-builder');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var api = new ApiBuilder();


api.get('/', function () {

    var test_string = "Here is a super awesome string that is going to be a super amazing one to test, believe me";

   // return consultWatson(test_string);
    return test_string;
});


function consultWatson(string) {
    var nlu = new NaturalLanguageUnderstandingV1({
        "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
        "username": "f1a68365-b09e-4ad1-b17e-52a0d5f80f4c",
        "password": "JBAtZWNXWqy6",
        "version_date": NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });

    nlu.analyze({
        'html': string, // Buffer or String
        'features': {
            'concepts': {},
            'keywords': {},
            'emotion': {}
        }
    }, function (err, response) {
        //TODO REFACTOR THIS. IT SUCKS
        if (err) {
            console.log('error:', err);
            return JSON.stringify(err, null, 2);
        } else {
            return JSON.stringify(response, null, 2);
        }
    });
};

module.exports = api;
