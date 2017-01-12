/**
 * Created by Dylan on 13/07/16.
 */
var config = {
    G8_URL: 'gig.demo.greenitglobe.com',
    CLIENT_ID: process.env.CLIENT_ID || "cloud potatoes",
    //"http://localhost:3000/callback"
    callBackUrl: process.env.callBackUrl || "http://85.255.197.77/callback",
    //"V-g38-gf_h52cRHML3WZsG9Pilc09ahP4sIQfYP1mguSrwq50vd5"
    client_secret: process.env.client_secret || "5ZQk_T0o0td5fdfbfRFca4nU917n1gxdVVeZPzv1Iw3sSw00WelK"
}
config.SCOPE = process.env.SCOPE || "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount,user:github,user:memberof:" + config.CLIENT_ID || "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount,user:github,user:memberof:test2"
console.log(config);
module.exports = config;
