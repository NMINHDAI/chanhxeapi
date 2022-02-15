const express = require('express');
const transportationRoute = require('../routes/transportation');
const stationRoute = require('../routes/station');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  

  app.use('/api/transportation',transportationRoute);
  app.use('/api/station', stationRoute);
  app.use(error);
}