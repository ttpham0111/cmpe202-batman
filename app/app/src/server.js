const app = require('./app');
const config = require('./config');


app.listen(config.port, config.host, null, function () {
  console.log('Listening on port ' + config.port);
});