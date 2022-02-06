const express = require('express');
const chanhxeRoute = require('../routes/chanhxe');
const baixeRoute = require('../routes/baixe');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  

  app.use('/api/chanhxe',chanhxeRoute);
  app.use('/api/baixe', baixeRoute);
  app.use(error);
}