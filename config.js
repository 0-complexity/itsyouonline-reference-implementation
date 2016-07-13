/**
 * Created by Dylan on 13/07/16.
 */
var config = {
    G8_URL: process.env.G8_URL || 'https://be-scale-1.demo.greenitglobe.com',
    CLIENT_ID: process.env.CLIENT_ID || "test2",
    callBackUrl: process.env.callBackUrl || "http://localhost:3000/callback",
    SCOPE: process.env.SCOPE || "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount,user:github,user:memberof:" + this.CLIENT_ID
}
console.log(config);
module.exports = config;
