const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db'); theres's no db
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views') //Optional --> Default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

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