const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db'); theres's no db
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

const app = express();

require('./startup/routes')(app);



// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan Enabled.....');
}

// Db work
// dbDebugger('Connected to the database.....'); let's say there's no db

app.use(logger);
app.use(auth);





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`APP LISTENING ON PORT ${PORT}`));