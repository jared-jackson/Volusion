'use strict';
var ApiBuilder = require('claudia-api-builder');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var api = new ApiBuilder();


api.get('/', function () {

    var test_string = "Here is a super awesome string that is going to be a super amazing one to test, believe me";

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

    nlu.analyze({
        'string': string, // Buffer or String
        'features': {
            'concepts': {},
            'keywords': {},
            'emotion': {}
        }
    }, function(err, response) {

        var test = JSON.stringify(err);

        if (err)
            console.log('error:', err);
        else
        return test;
    });
}

module.exports = api;
