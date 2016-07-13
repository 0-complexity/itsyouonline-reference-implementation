# Step One

Installation details : [https://www.gitbook.com/book/gig/itsyouonline/details](https://www.gitbook.com/book/gig/itsyouonline/details).

To start we create a new Node.js express app in Webstorm (or other IDE'S).

First we take a look at the given Authorization code link : 

[https://itsyou.online/v1/oauth/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=CALLBACK_URL&scope=read&state=STATE](https://itsyou.online/v1/oauth/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=CALLBACK_URL&scope=read&state=STATE)

The CLIENT_ID stands for the name of the organization as which you signed up on itsyou.online.
In this example we use Test2.

![](img/1.png)

So we create a constant in our program called CLIENT_ID.

```const CLIENT_ID = "test2";```

Next the redirect uri is equal to the callback address you choose, in this case we are going to loopback to a localhost (address can be chosen freely).
So again we create a variable called callBack which we set to: 

```var callBack = "http://localhost:3000/callback";```

The scope is the actual data you want to fetch from itsyou.online , take a quick look here

https://gig.gitbooks.io/itsyouonline/content/oauth2/scopes.html

in this example we want all the information that the user has.
So the scope will look something like this:

```var SCOPE = "user:name,user:email:user,user:facebook,user:address:main,user:phone:main,user:bankaccount:main,user:github"```

Next we generate a random state (security reasons), we store it in our session and then we render the login page by referring to the login url.

```var loginUrl = 'https://itsyou.online/v1/oauth/authorize?response_type=code&client_id=' + CLIENT_ID
        + '&redirect_uri=' + callBack
        + '&scope=' + SCOPE
        + '&state=' + state
    res.render('index', {
            loginUrl: loginUrl
        }
    );```
    
Next you will have to login to itsyou.online and you need to give permission as user on which information you wish to share (the information asked from the user depends on the scope).
At this moment, the user will get an accesstoken which will be used in the following steps.
