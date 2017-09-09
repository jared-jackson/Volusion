'use strict';
var ApiBuilder = require('claudia-api-builder');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var api = new ApiBuilder();


api.get('/', function () {

    var test_string = "<div><h3>THIS IS A SUPER AWESOME STRING WE ARE GOING TO BE EXAMINING</h3>";

    var nlu = new NaturalLanguageUnderstandingV1({
        username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
        password: 'JBAtZWNXWqy6',
        version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });

    nlu.analyze({
        'html': test_string, // Buffer or String
        'features': {
            'concepts': {},
            'keywords': {},
            'emotion': {}
        }
    }, function(err, response) {
        var test = response.emotion;
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
        return response.json(test);
    });

});



module.exports = api;
