const app = require('./app');
const { info } = require('winston');

const PORT = 3000;

app().listen(PORT, () => info(`App listening on port ${PORT}`));
