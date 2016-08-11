## Installation guide on a virtual machine

First you begin with creating a virtual machine on your cloudspace, select an operating system of your choice. Then you make a new port forward from your local port to a public port.

Click on your virtual machine to see all the details, you will need the initial credentials and the IP address to connect.

Once your machine is running you can connect to it, open your command line on your local workingstation.

```ssh login@ipOfVm -p 'your port'```

enter your password (initials credentials)

Once your logged in you will need a ssh key to connect to GitHub in order to clone the project to your VM.

Here you can find more information on how to generate a SSH-key.

https://help.github.com/articles/generating-an-ssh-key/

If ```pbcopy < ~/.ssh/id_rsa.pub``` is not working you can use:
```cat < ~/.ssh/id_rsa.pub```

Then paste the ssh key into your GitHub account.

When this is done you make a new directory in which you want to clone the project to your VM.

excecute:

```git clone git@github.com:0-complexity/itsyouonline-reference-implementation.git```

Go into your root folder and excecute:

```node bin/www```

The server will be running and you can navigate to it by surfing to the IP-address.

## VDC control panel configuration

In order te cope with the same origin policy you have to install a reverse proxy server.

Nginx
```
sudo apt-get update
sudo apt-get install nginx
```

Then go in the configuration file :
`sudo vi /etc/nginx/sites-enabled/default`

Insert this configuration : 
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

Start the nginx server and you are good to go!

`sudo systemctl start nginx`
