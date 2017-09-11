var rp = require('request-promise');
var ApiBuilder = require('claudia-api-builder');
var cheerio = require('cheerio');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var request = require('request');
var RSVP = require('rsvp');

var api = new ApiBuilder();


// Approach 1 works, but has a race condition
// api.get('/', function (req) {
//     var analyze_url = req.queryString.url;
//     console.log("Initial");
//     return new RSVP.Promise(function (resolve, reject) {
//         console.log("initial");
//         request(analyze_url, function (error, response, html) {
//             console.log("inside the request");
//             var article_content = "";
//             if (!error) {
//                 var $ = cheerio.load(html);
//                 var watson_response = "";
//                 $('.post-content').filter(function () {
//                     var data = $(this);
//                     article_content = data.parent().children().text().trim();
//                 });
//                 var nlu = new NaturalLanguageUnderstandingV1({
//                     username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
//                     password: 'JBAtZWNXWqy6',
//                     version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
//                 });
//                 var analyze_text = article_content.toString();
//                 console.log(analyze_text);
//                 //I think nlu.analyze is finishing before request completes its call to get the html
//                 nlu.analyze({
//                     'html': analyze_text,
//                     'features': {
//                         'concepts': {},
//                         'keywords': {},
//                         'emotion': {}
//                     }
//                 }, function (err, response) {
//                     console.log(err, "The interal server error we're getting")
//                     if (err) {
//                         reject(err);
//                     } else {
//                         watson_response = response.emotion.document.emotion;
//                         console.log(watson_response);
//                         resolve(watson_response);
//                     }
//                 });
//             }
//         })
//     });
// }, {success: {contentType: 'application/json'}});


//Approach 2 -- Socket hang up up when request module takes too long
// api.get('/', function (req) {
//     var analyze_url = req.queryString.url;
//     console.log("initial api call to url: " + analyze_url);
//     var promise = new RSVP.Promise(function (resolve, reject) {
//         request(analyze_url, function (error, response, html) {
//             console.log("in request");
//             var article_content = "";
//             if (!error) {
//                 var $ = cheerio.load(html);
//                 $('.post-content').filter(function () {
//                     var data = $(this);
//                     article_content = data.parent().children().text().trim();
//                     console.log("trying to resolve article content" + article_content);
//                     resolve(article_content);
//                 });
//             } else {
//                 console.log("REJECTING" + error);  // socket hang up when request takes too long
//                 reject(error);
//             }
//         });
//     });
//     promise.then(function (value) {
//         console.log("content outside promise" + value);
//         return new RSVP.Promise(function (resolve, reject) {
//             var watson_response = "";
//             var article_content = value.toString();
//
//             console.log("CONTENT INSIDE PROMISE", article_content);
//
//             var nlu = new NaturalLanguageUnderstandingV1({
//                 username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
//                 password: 'JBAtZWNXWqy6',
//                 version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
//             });
//             var analyze_text = article_content.toString();
//             console.log("ANALYZING TEXT" + analyze_text);
//             //I think nlu.analyze is finishing before request completes its call to get the html
//             // nlu.analyze({
//             //     'html': analyze_text,
//             //     'features': {
//             //         'concepts': {},
//             //         'keywords': {},
//             //         'emotion': {}
//             //     }
//             // }, function (err, response) {
//             //     console.log(err, "The interal server error we're getting")
//             //     if (err) {
//             //         reject(err);
//             //     } else {
//             //         watson_response = response.emotion.document.emotion;
//             //         console.log("RESPONSE " + watson_response);
//             //         resolve(watson_response);
//             //     }
//             // });
//         });
//
//     }).catch(function (error) {
//         // failure
//     });
// }, {success: {contentType: 'application/json'}});


//Approach 3
api.get('/', function (req) {
    'use strict';
    var analyze_url = req.queryString.url;
    console.log("initial api call to url: " + analyze_url);

    rp(analyze_url).then(function (htmlString) {
        console.log('INSIDE RP' + htmlString);
        var article_content = "";
        var watson_response;
        var $ = cheerio.load(htmlString);
        $('.post-content').filter(function () {
            var data = $(this);
            article_content = data.parent().children().text().trim();
            console.log('GOT ARTICLE CONTENT' + article_content);
        });

        var nlu = new NaturalLanguageUnderstandingV1({
            username: 'f1a68365-b09e-4ad1-b17e-52a0d5f80f4c',
            password: 'JBAtZWNXWqy6',
            version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
        });
        var analyze_text = article_content.toString();
        //I think nlu.analyze is finishing before request completes its call to get the html
        console.log("initialize nlu");
        nlu.analyze({
            'html': analyze_text,
            'features': {
                'concepts': {},
                'keywords': {},
                'emotion': {}
            }
        }, function (err, response) {
            if (err) {
                console.log("There was an error" + error);
            } else {
                watson_response = response.emotion.document.emotion;
                console.log("WATSON HAS SPOKEN " + watson_response);
                return watson_response;
            }
        });

    }).catch(function (err) {
        console.log("caught error" + err);
    });






}, {success: {contentType: 'application/json'}});



module.exports = api;
