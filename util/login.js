/**
 * Created by Dylan on 12/07/16.
 */
const CLIENT_ID = "test2";
var callBackUrl = "http://localhost:3000/callback";
var SCOPE = "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount:stealing money,user:github"
function createLoginUrl(request) {
    var state = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        state += possible.charAt(Math.floor(Math.random() * possible.length));

    // todo storeStateInSession
    request.session.oauthState = state;
    return 'https://itsyou.online/v1/oauth/authorize?response_type=code&client_id=' + CLIENT_ID
        + '&redirect_uri=' + callBackUrl
        + '&scope=' + SCOPE
        + '&state=' + state
}

module.exports = {
    createLoginUrl: createLoginUrl
};