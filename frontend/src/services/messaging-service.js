const axios = require('axios');
 
exports.registerSession = async (tkn) =>{

   const response = await axios.post('https://localhost:5000/register-session', {tkn: tkn} );
   return response;

}

