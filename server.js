const express = require('express');

// port to run the app on
const port = process.env.PORT || 80;

// create the main instance of the app
const app = express();

// FRONTEND
app.use('/', express.static('./dist'));

app.listen(port);

console.log('Server is running on port ' + port);
