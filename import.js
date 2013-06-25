var readline = require('readline');
var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;
var googleDrive = require('google-drive');
var request = require('request');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

var gFileId = '1lq8BbiIBPx_-3zCtuvjWUc9f5yWplmtHW4OPkIP4ziw';

gFile(gFileId, function(err, body){
  if (err) throw(err);
  var $ = cheerio.load(body);
  var indexFile = path.join(__dirname, 'app', 'index.html');
  var $index = cheerio.load(fs.readFileSync(indexFile));
  var storyHtml = '';
  var ended = false;
  var inSection = false;
  $('p').each(function(i, p){
    var $p = $(p);
    var pHtml = '';
    var section;
    if (ended) return;
    if ($p.text().match(/\[\[end\]\]/i)){
      ended = true;
    }else if ($p.text().match(/\{/)){
      // skip the comment
    }else if ($p.text().match(/\[\[/)){
      section = $p.text().match(/=(.*)\]]/)[1];
      if (inSection){
        storyHtml += '</section>';
      }
      inSection = true;
      storyHtml += '<section id="' + section.toLowerCase().replace(/ +/g, '-') + '">';
      storyHtml += '<h2>' + section.toUpperCase() + '</h2>';
    }else{
      $p.children('span').each(function(i, span){
        pHtml += $(span).html();
      });
      if (pHtml.length){
        storyHtml += '<p>' + pHtml + '</p>';
      }
    }
  });
  if (inSection){
    storyHtml += '</section>';
  }
  $index('article').remove('section').append(storyHtml);
  fs.writeFileSync(indexFile, $index.html());
  console.error('OK');
});

function gFile(fileId, cb){
  getTokenOrDoOAuth(function(err, token){
    googleDrive(token).files(fileId).get(function(err, res, body){
      if (err) return cb(err);
      var metadata = JSON.parse(body);
      var url = metadata.exportLinks['text/html'];
      var options = {url: url, headers: {Authorization: 'Bearer ' + token}};
      request(options, function(err, res, body){
        cb(err, body);
      });
    });
  });
}

// If TOKEN env variable is passed use that to authenticate. Otherwise, use
// CLIENT_ID and CLIENT_SECRET to do OAuth2 to get the token
function getTokenOrDoOAuth(cb){
  var token = process.env.TOKEN;
  if (token) return cb(null, token);
  var CLIENT_ID = process.env.CLIENT_ID;
  var CLIENT_SECRET = process.env.CLIENT_SECRET;
  var REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob';

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  googleapis
    .discover('drive', 'v2')
    .execute(function(err) {

    if (err) return cb(err);

    var oauth2Client =
      new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/drive'
    });

    console.log('Visit the url: ', url);
    rl.question('Enter the code here:', function(code) {

      // request access token
      oauth2Client.getToken(code, function(err, tokens) {
        if (err) return cb(err);
        oauth2Client.credentials = tokens;
        console.error('Next time call this script with: TOKEN=' + tokens.access_token + ' node import.js');
        cb(null, tokens.access_token);
      });
    });
  });
}
