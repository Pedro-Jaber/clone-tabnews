import { Client } from "pg";

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.error("Database Error: \n", err);
    throw err;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const connection_obj = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  };

  // console.log("Credenciais do Postgres:", connection_obj);
  const client = new Client(connection_obj);
  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
