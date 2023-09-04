// const { MongoClient } = require("mongodb");
const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017'; // MongoDB connection URL
const dbName = "ecom";

const state = {
  db: null,
};

module.exports.connect = async function (done) {
  if (state.db) {
    // If the database connection is already established, no need to connect again.
    return done();
  }

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    state.db = client.db(dbName);
    done();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    done(err);
  }
};

module.exports.get = function () {
  if (!state.db) {
    throw new Error("Database not connected");
  }
  return state.db;
};
