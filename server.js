//external dependencies
const express = require('express');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

//

const app = (module.exports = express());
const port = process.env.PORT || 3000;
const routes = require('./routes/root.routes');

//accept & parse urlencoded and requests
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

// create a file write stream (flag: 'a' for append)
var logStream = fs.createWriteStream(path.join(__dirname, 'requests.log'), { flags: 'a' })

// Log requests to file using standard Apache 'combined' log output -> https://httpd.apache.org/docs/2.4/logs.html
app.use(morgan('combined', { stream: logStream }))

//start database connection
require('./drivers/mongodb');

//load root routing table and bind on /api
app.use('/api', routes);

//start the express listener on our desired port
app.listen(port, () => {
    console.info(`Started server on port ${port}`);
  }); 

