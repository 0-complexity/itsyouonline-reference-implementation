## Installation Steps

- [Clone repository](#clone-repository)
- [Update configuration](#update-config)
- [Install Node.js](#install-nodejs)
- [Install NGINX](#install-nginx)


<a id="clone-repository"></a>
### Clone repository

On a new Ubuntu virtual machine clone the example code:

```
git clone git@github.com:yveskerwyn/iyo-nodejs-example.git
```


<a id="update-config"></a>
### Update configuration

Update `config.js`:

```
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
```

Also `views/user.jade` needs to be updated in order to change the hard-coded id of the virtual datacenter that is shown in the VDC Control Panel.


<a id="install-nodejs"></a>
### Install Node.js

Instal `Node.js`: https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm

```
cd /tmp
sudo wget http://nodejs.org/dist/v7.4.0/node-v7.4.0-linux-x64.tar.gz
sudo tar xvfz node-v7.4.0-linux-x64.tar.gz
sudo mkdir -p /usr/local/nodejs
sudo mv node-v7.4.0-linux-x64/* /usr/local/nodejs
```

Add `/usr/local/nodejs/bin` to the PATH environment variable:

```
export PATH=$PATH:/usr/local/nodejs/bin
```

Go into your root folder and execute:

```
node bin/www
```

The server will be running and you can navigate to it by surfing to the IP-address.

<a id="add-control-panel"></a>
## Adding the VDC Control Panel

Clone the G8VDC repository in the `public` directory of the node repository:

```
git clone git@github.com:0-complexity/G8VDC.git
```

@todo better to put in separate Docker container


<a id="install-nginx"></a>
## Install NGINX

In order te cope with the same origin policy you have to install a reverse proxy server. Here we use NGINX.

In order to install NGINX:

```
sudo apt-get update
sudo apt-get install nginx
```

Update NGINX the configuration file :

`sudo vi /etc/nginx/sites-enabled/default`

Replace all configuration like with:

```
server{
        listen 80;
        server_name itsyouonlineimpl.com;

        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forward-Proto http;
                proxy_set_header X-Nginx-Proxy true;
                proxy_redirect off;
        }

        location /restmachine {
                resolver 8.8.8.8;
                proxy_pass https://$http_x_g8_domain;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forward-Proto http;
                proxy_set_header X-Nginx-Proxy true;
                add_header X-test $http_x_g8_domain;
                proxy_redirect off;
        }
}
```

Start the NGINX server:

```
sudo systemctl start nginx
```
