var ApiBuilder = require('claudia-api-builder');
var cheerio = require('cheerio');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var request = require('request');
var RSVP = require('rsvp');

var api = new ApiBuilder();

api.get('/', function (req) {
    var analyze_url = req.queryString.url;
    return new RSVP.Promise(function (resolve, reject) {
        request(analyze_url, function (error, response, html) {
            var article_content = "";
            if (!error) {
                var $ = cheerio.load(html);
                var watson_response = "";
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
                //TODO There might be a race condition here.
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
                        watson_response = response.emotion.document.emotion;
                        resolve(watson_response);
                    }
                });
            }
        })
    });
}, {success: {contentType: 'application/json'}});

module.exports = api;
