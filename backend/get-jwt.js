var {google} = require('googleapis');
var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
var SCOPES = [MESSAGING_SCOPE];

      var key = require('./firebase-key.json');
      var jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      );
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          
          console.log(err);
        }
        console.log(tokens.access_token);
      });