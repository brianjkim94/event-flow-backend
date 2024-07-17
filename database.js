const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/eventFlow';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

module.exports = mongoose;
