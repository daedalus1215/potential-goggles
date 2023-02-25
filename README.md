### Required:
* `client/src/config.json` 
```
{
    "api": "http://{baseUrl}:{port}/api/" // connects us to the backend
}
```
* `server/config.js`
```
module.exports = () => ({
    "mongoServerAndPort": 'databaseUrl:databasePort', // db connection
    "serverPort": 3001, // port we want to listen for requests
    "address": "127.0.0.1" // address we want to listen for requests
})
```