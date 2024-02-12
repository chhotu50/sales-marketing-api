const { MongoClient } = require("mongodb");
const url = process.env.MONGODB_URL;
const dbName = process.env.DATABASE_NAME;
async function connect() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connect };
