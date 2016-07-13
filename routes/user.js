/**
 * Created by Dylan on 12/07/16.
 */
var express = require('express');
var querystring = require('querystring');
var request = require('request');
var util = require('../util/login.js');
var tokenUrl = "https://itsyou.online/v1/oauth/jwt?"
var config = require('../config');

var router = express.Router();
router.get('/', function (req, res) {
    var accesToken = req.session.accesToken;
    if (!accesToken || accesToken.expires_in < 60) {
        // go to authorize page
        var loginUrl = util.createLoginUrl(req) // todo
        res.redirect(loginUrl)
    } else {
        var url2 = 'https://itsyou.online/api/users/' + accesToken.info.username + '/info?';
        var userInfoRequest = {
            method: 'GET',
            url: url2,
            headers: {
                'Authorization': 'token ' + accesToken.access_token
            }

        };
        request(userInfoRequest, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('info req', body)
                var jwtRequest = {
                    method: 'POST',
                    url: tokenUrl + "scope=",
                    headers: {
                        'Authorization': 'token ' + accesToken.access_token
                    }
                }
                request(jwtRequest, function (error, response, jwt) {
                    if (!error && response.statusCode == 200) {
                        console.log('jwt', jwt)
                        req.session.jwt = jwt;
                        res.render('user', {
                            jwt: jwt,
                            title: 'User info',
                            userInfo: JSON.parse(body),
                            G8_URL: config.G8_URL,
                            accesToken: accesToken
                        });
                    }
                    else {
                        console.error(error, response.statusCode, body)
                    }
                });
            } else {
                console.error(error, response.statusCode, body)
            }
        });
    }
});

module.exports = router;