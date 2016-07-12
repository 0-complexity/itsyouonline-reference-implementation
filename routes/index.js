var express = require('express');
var session = require('express-session');
var router = express.Router();
const CLIENT_ID = "test2";
var callBack = "http://localhost:3000/callback";
var SCOPE = "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount:fortis,user:github"
/* GET home page. */
router.get('/', function (req, res, next) {
    // todo createRandomState
    var state = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        state += possible.charAt(Math.floor(Math.random() * possible.length));

    // todo storeStateInSession
    req.session.oauthState = state;

    var loginUrl = 'https://itsyou.online/v1/oauth/authorize?response_type=code&client_id=' + CLIENT_ID
        + '&redirect_uri=' + callBack
        + '&scope=' + SCOPE
        + '&state=' + state
    res.render('index', {
            loginUrl: loginUrl
        }
    );
});

module.exports = router;