const { connect } = require("./../config/clientDB");

async function createCollection(collectionName) {
  const db = await connect();
  await db.createCollection(collectionName);
  console.log(`Collection ${collectionName} created`);
}

async function removeCollection(collectionName) {
  const db = await connect();
  await db.removeCollection(collectionName);
  console.log(`Collection ${collectionName} removed`);
}

async function insertDocument(collectionName, document) {
  const db = await connect();
  const collection = db.collection(collectionName);
  document.created_at = new Date();
  document.updated_at = new Date();
  await collection.insertOne(document);
  console.log("Document inserted");
}

async function findDocuments(collectionName, query) {
  const db = await connect();
  const collection = db.collection(collectionName);
  return await collection.find(query).sort({ created_at: -1 }).toArray();
}

async function findByIdDocuments(collectionName, query) {
  const db = await connect();
  const collection = db.collection(collectionName);
  return await collection.findOne(query);
}

async function updateDocument(collectionName, filter, update) {
  const db = await connect();
  const collection = db.collection(collectionName);
  update.updated_at = new Date();
  await collection.updateOne(filter, { $set: update });
  console.log("Document updated");
}

async function deleteDocument(collectionName, filter) {
  const db = await connect();
  const collection = db.collection(collectionName);
  await collection.deleteOne(filter);
  console.log("Document deleted");
}

module.exports = {
  createCollection,
  insertDocument,
  findDocuments,
  updateDocument,
  deleteDocument,
  removeCollection,
  findByIdDocuments,
};
