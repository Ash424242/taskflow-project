const { app } = require('../../../server/src/app');

module.exports = (req, res) => {
  // Delegamos la petición al mismo Express app que se usa en local.
  return app(req, res);
};

