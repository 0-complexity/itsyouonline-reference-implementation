/**
 * Created by Dylan on 13/07/16.
 */
var config = {
    G8_URL: process.env.G8_URL || 'https://be-scale-1.demo.greenitglobe.com',
    CLIENT_ID: process.env.CLIENT_ID || "test2",
    callBackUrl: process.env.callBackUrl || "http://localhost:3000/callback",
    client_secret: process.env.client_secret || "V-g38-gf_h52cRHML3WZsG9Pilc09ahP4sIQfYP1mguSrwq50vd5"
}
config.SCOPE = process.env.SCOPE || "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount,user:github,user:memberof:" + config.CLIENT_ID
console.log(config);
module.exports = config;

