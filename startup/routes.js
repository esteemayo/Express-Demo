const express = require('express');
const helmet = require('helmet');
const courses = require('../routes/courses');
const home = require('../routes/home');

module.exports = app => {
    app.set('view engine', 'pug');
    app.set('views', './views') //Optional --> Default

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(helmet());

    app.use('/api/courses', courses);
    app.use('/', home);
};