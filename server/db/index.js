const humps = require('humps');

const camelizeColumns = (data) => {
  const names = Object.keys(data[0]);
  const camels = names.map(n => humps.camelize(n));
  data.forEach((d) => {
    names.forEach((n, i) => {
      const c = camels[i];
      if (!(c in d)) {
        d[c] = d[n];
        delete d[n];
      }
    });
  });
};

const options = {
  receive(data) {
    if (data.length !== 0) {
      camelizeColumns(data);
    }
  }
};

const pgp = require('pg-promise')(options);

pgp.pg.types.setTypeParser(1082, value => value);

const config = {
  host: process.env.NODE_ENV === 'production' ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` : process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL
};

const db = pgp(config);

module.exports = db;
