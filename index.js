'use strict';
var ApiBuilder = require('claudia-api-builder');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var api = new ApiBuilder();


api.get('/', function () {

    var test_string = "<div><h3>THIS IS A SUPER AWESOME STRING WE ARE GOING TO BE EXAMINING</h3>";

    var test = consultWatson(test_string);

    return test + "THIS";
    //return test_string;
});


function consultWatson(string) {
    var nlu = new NaturalLanguageUnderstandingV1({
        username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
        password: 'JBAtZWNXWqy6',
        version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });

    return string;

    // nlu.analyze({
    //     'html': string, // Buffer or String
    //     'features': {
    //         'concepts': {},
    //         'keywords': {},
    //         'emotion': {}
    //     }
    // }, function(err, response) {
    //     if (err)
    //         console.log('error:', err);
    //     else
    //         console.log(JSON.stringify(response, null, 2));
    //    return response.emotion;
    // });
}

module.exports = api;
