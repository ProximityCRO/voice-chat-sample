var cache = require('memory-cache');
 

exports.add =  (key, value) =>{
  cache.put(key, value);
  console.log( { key,value } );
}
exports.get =  (key) =>{
  console.log({key}) 
  return cache.get(key);
   
}
