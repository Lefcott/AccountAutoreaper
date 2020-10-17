const mongoose = require('mongoose');

require('./models');

mongoose.set('useCreateIndex', true);
mongoose.connect(env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async error => {
  if (error) return logError(error);
  log('Connected to MongoDB!');
});
