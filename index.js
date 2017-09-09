'use strict';
var ApiBuilder = require('claudia-api-builder');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var api = new ApiBuilder();


api.get('/', function () {  
  'use strict';
  return 'Hello World';
});




function consultWatson(string) {
    var nlu = new NaturalLanguageUnderstandingV1({
        "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
        "username": "f1a68365-b09e-4ad1-b17e-52a0d5f80f4c",
        "password": "JBAtZWNXWqy6"
    });

    nlu.analyze({
        'html': string, // Buffer or String
        'features': {
            'concepts': {},
            'keywords': {},
            'emotion': {}
        }
    }, function(err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
        console.log(response.emotion);
    });
};

module.exports = api;
