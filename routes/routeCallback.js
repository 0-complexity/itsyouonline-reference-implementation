/**
 * Created by Dylan on 11/07/16.
 */
var CLIENT_ID = "test2";
var client_secret = "V-g38-gf_h52cRHML3WZsG9Pilc09ahP4sIQfYP1mguSrwq50vd5";
var redirect_uri = "http://localhost:3000/callback";
var express = require('express');
var request = require('request');
var util = require('../util/login');
var router = express.Router();
var querystring = require('querystring');

router.get('/', function (req, res) {
    var state = req.query.state;
    // todo: check if state matches with state in session
    var code = req.query.code;
    var userInfo = "";
    var accesToken;

    //access token ophalen
    //get user info
    // todo: POST request to https://itsyou.online/v1/oauth/access_token?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=AUTHORIZATION_CODE&redirect_uri=CALLBACK_URL&state=STATEy
    var queryString = querystring.stringify({
        client_id: CLIENT_ID,
        client_secret: client_secret,
        code: code,
        redirect_uri: redirect_uri,
        state: state
    });
    var url = "https://itsyou.online/v1/oauth/access_token?" + queryString;
    var params = {
        method: 'POST',
        url: url
    }
    request(params, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('body', body)

            accesToken = JSON.parse(body);
            //response: access token:https://itsyou.online/api/users/bob/info?access_token=...
            // todo: request to https://itsyou.online/api/users/bob/info?access_token=ACCESS_TOKEN
            var url2 = 'https://itsyou.online/api/users/' + accesToken.info.username + '/info?';
            var userInfoRequest = {
                method: 'GET',
                url: url2,
                headers: {
                    'Authorization': 'token ' + accesToken.access_token
                }

            };
            console.log(userInfoRequest);
            request(userInfoRequest, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('info req', body)
                    req.session.accesToken = accesToken;
                    res.redirect('/user');
                } else {
                    console.error(error, response.statusCode, body)
                }
                console.log(userInfo);
            });
        } else {
            console.error(error, response.statusCode, body);
        }
    })
});

module.exports = router;