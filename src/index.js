const app = require('./app');
const mongoose = require('mongoose');
const { info } = require('winston');

const { PORT = 3000, MONGO_URL } = process.env;

const setupDB = async url => {
  if (url) {
    await mongoose.connect(MONGO_URL);
  }
}

setupDB(MONGO_URL);

app().listen(PORT, () => info(`App listening on port ${PORT}`));
