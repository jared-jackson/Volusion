'use strict';
var ApiBuilder = require('claudia-api-builder');
var cheerio = require('cheerio');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var request = require('request');
var RSVP = require('rsvp');

var api = new ApiBuilder();

api.get('/', function (req) {

    var analyze_url = req.queryString.url;


//Aproach 1

    return new RSVP.Promise(function (resolve, reject) {
        request(analyze_url, function (error, response, html) {
            var article_content = "";
            if (!error) {
                var $ = cheerio.load(html);
                var test = "";
                $('.post-content').filter(function () {
                    var data = $(this);
                    article_content = data.parent().children().text().trim();
                });
                var nlu = new NaturalLanguageUnderstandingV1({
                    username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
                    password: 'JBAtZWNXWqy6',
                    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
                });
                var analyze_text = article_content.toString();

                console.log(analyze_text, "THE ANALYZED TEST");

                nlu.analyze({
                    'html': analyze_text,
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
            }
        })
    });


// Approach 2
//     request(analyze_url, function (error, response, html) {
//         console.log(html);
//         if (!error) {
//             var $ = cheerio.load(html);
//             var test = "";
//             $('.post-content').filter(function () {
//                 var data = $(this);
//                 var article_content = data.parent().children().text().trim();
//                 test = createTextVersion(article_content);
//             });
//             var analyze_content = test.toString();
//             console.log(analyze_content);
//             return new RSVP.Promise(function (resolve, reject) {
//                 var nlu = new NaturalLanguageUnderstandingV1({
//                     username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
//                     password: 'JBAtZWNXWqy6',
//                     version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
//                 });
//                 nlu.analyze({
//                     'html': analyze_content,
//                     'features': {
//                         'concepts': {},
//                         'keywords': {},
//                         'emotion': {}
//                     }
//                 }, function (err, response) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         test = response.emotion.document.emotion;
//                         resolve(test);
//                     }
//                 });
//             });
//         }
//     });

//WORKING
//     var analyze_content = "THIS IS OUR SUPER AWESOME STRING";
//     return new RSVP.Promise(function (resolve, reject) {
//         var nlu = new NaturalLanguageUnderstandingV1({
//             username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
//             password: 'JBAtZWNXWqy6',
//             version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
//         });
//         var test = {};
//         nlu.analyze({
//             'html': analyze_content,
//             'features': {
//                 'concepts': {},
//                 'keywords': {},
//                 'emotion': {}
//             }
//         }, function (err, response) {
//             if (err) {
//                 reject(err);
//             } else {
//                 test = response.emotion.document.emotion;
//
//                 resolve(test);
//             }
//         });
//     });


}, {success: {contentType: 'application/json'}});

module.exports = api;
