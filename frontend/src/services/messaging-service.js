const axios = require('axios');

exports.registerSession = async (tkn) => {

   const response = await axios.post('http://localhost:5000/register-session', { tkn: tkn });
   console.log(response);
   return response;

}

exports.storeMessage = async (tkn, from, message) => {

   const response = await axios.post('http://localhost:5000/store-message', { tkn: tkn, from: from, message: message });
   console.log(response);
   return response;

}


exports.getChat = async (tkn) => {

   const response = await axios.post('http://localhost:5000/chat', { tkn: tkn });
   console.log(response);
   return response;

}
