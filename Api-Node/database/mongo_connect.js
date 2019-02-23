const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Complex_Api');
mongoose.Promise = global.Promise;

module.exports = mongoose;