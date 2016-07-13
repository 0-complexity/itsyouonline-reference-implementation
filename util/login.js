/**
 * Created by Dylan on 12/07/16.
 */
var config = require("../config");
function createLoginUrl(request) {
    var state = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        state += possible.charAt(Math.floor(Math.random() * possible.length));

    // todo storeStateInSession
    request.session.oauthState = state;
    return 'https://itsyou.online/v1/oauth/authorize?response_type=code&client_id=' + config.CLIENT_ID
        + '&redirect_uri=' + config.callBackUrl
        + '&scope=' + config.SCOPE
        + '&state=' + state
}

module.exports = {
    createLoginUrl: createLoginUrl
};