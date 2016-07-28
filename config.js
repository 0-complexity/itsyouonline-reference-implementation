/**
 * Created by Dylan on 13/07/16.
 */
var config = {
    G8_URL: 'gig.demo.greenitglobe.com',
    CLIENT_ID: process.env.CLIENT_ID || "test2",
    callBackUrl: process.env.callBackUrl || "http://localhost:3000/callback" || "http://85.255.197.109/callback",
    client_secret: process.env.client_secret || "V-g38-gf_h52cRHML3WZsG9Pilc09ahP4sIQfYP1mguSrwq50vd5" || "lAKqMz_TPwdMzdJ1TrV-v-A4TBtAQlY7-rcW4o1-bY655SuGpiNo"
}
config.SCOPE = process.env.SCOPE || "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount,user:github,user:memberof:" + config.CLIENT_ID || "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount,user:github,user:memberof:test2"
console.log(config);
module.exports = config;

