const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { PORT } = process.env;

if (!PORT) {
  throw new Error('El puerto no está definido');
}

const parsedPort = Number(PORT);
if (!Number.isFinite(parsedPort) || parsedPort <= 0) {
  throw new Error('El puerto definido no es válido');
}

module.exports = { PORT: parsedPort };

