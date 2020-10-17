const mongoose = require('mongoose');

require('./models');
const { MONGODB_URL } = require('../env');

mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async error => {
  if (error) return logError(error);
  log('Connected to MongoDB!');
});
