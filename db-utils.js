const { Pool, Client } = require('pg');

module.exports = {
    query
};
const api_key="68df731e-2a20-47cc-8381-e862c8682ea7"
const pool = new Pool({
  user: 'ofamvgwl',
  host: 'rogue.db.elephantsql.com',
  database: 'ofamvgwl',
  password: 'acBZIKgUY8S36Q2oeVFcru5tdtNA2RLv',
  port: 5432
});

async function query(sql, params) {
	return await pool.query(sql, params);
}
