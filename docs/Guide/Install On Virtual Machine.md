## Installation guide on a virtual machine

First you begin with creating a virtual machine on your cloudspace, select an operating system of your choice. Then you make a new port forward from your local port to a public port.

Click on your virtual machine to see al the details, you will need the initial credentials and the IP address to connect.

Once your machine is running you can connect to it, open your command line on your local workingstation.

```ssh login@ipOfVm -p 'your port'```

enter your password (initials credentials)

Once your logged in you will need a ssh key to connect to GitHub in order to clone the project to your VM.

Here you can find more information on how to generate a SSH-key.
[](https://help.github.com/articles/generating-an-ssh-key/)

If ```pbcopy < ~/.ssh/id_rsa.pub``` is not working you can use:
```cat < ~/.ssh/id_rsa.pub```

Then paste the ssh key into your GitHub account.

When this is done you make a new directory in which you want to clone the project to your VM.

excecute:

```git clone git@github.com:0-complexity/itsyouonline-reference-implementation.git````

Go into your root folder and excecute:

```node bin/www````

The server will be running and you can navigate to it by surfing to the IP-address.

