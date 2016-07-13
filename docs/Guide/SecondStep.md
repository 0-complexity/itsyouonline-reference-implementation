# Step two

The first thing you want to look up is the client secret, this is shown when when you make a new company.

![](https://github.com/0-complexity/itsyouonline-reference-implementation/blob/master/img/2.png)

Next you make a new file to write the code for implementing the callback. Declare a variable which holds the secret and a variable which is the callback URL.

```var client_secret = "V-g38-gf_h52cRHML3WZsG9Pilc09ahP4sIQfYP1mguSrwq50vd5"```

```var redirect_uri = "http://localhost:3000/callback"```

Also check if the state in our session is still the same as the current state.

It's important that you make a POST request to: 

https://itsyou.online/v1/oauth/access_token?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=AUTHORIZATION_CODE&redirect_uri=CALLBACK_URL&state=STATE

when all the values are filled in correctly you will get a response with the accesstoken that will look something like this.

```{"access_token":"ACCESS_TOKEN","token_type":"bearer","expires_in":86400,"refresh_token":"REFRESH_TOKEN","scope":"read","info":{"username":"bob"}}```

Now the application is authorized. It may use the token to access the user's account via the service API, limited to the scope of access, until the token expires or is revoked. If a refresh token was issued, it may be used to request new access tokens if the original token has expired.

The access token allows you to make requests to the API on a behalf of a user.

```GET https://itsyou.online/api/users/bob/info?access_token=...```

You can pass the token in the query params like shown above, but a cleaner approach is to include it in the Authorization header

```Authorization: token OAUTH-TOKEN```

For example, in curl you can set the Authorization header like this:

```curl -H "Authorization: token OAUTH-TOKEN"```

If you make a GET request to https://itsyou.online/api/users/"accessToken.info.username"/info you will get JSON data in response in which you can pull out all the data you want to use.
