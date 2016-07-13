var express = require('express');
var session = require('express-session');
var router = express.Router();
/* GET home page. */
var util = require('../util/login');
router.get('/', function (req, res, next) {
    // todo createRandomState
    console.log(req.session)
    if (!req.session || !req.session.accessToken || req.session.accessToken.expires_in < 60) {
        showHomePage()
    }
    else {
        req.redirect('/user');
    }

    function showHomePage() {
        res.render('index', {
                loginUrl: util.createLoginUrl(req)
            }
        );
    }
});

module.exports = router;