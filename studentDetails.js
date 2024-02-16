const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'StudDatabase';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function StudentData() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Get a reference to the database
    const db = client.db(dbName);

    // Collection Name
    const collectionName = 'students';
    const collection = db.collection(collectionName);

    // Insert sample data
    await collection.insertMany([
      { name: 'Alice', age: 25, city: 'New York' },
      { name: 'Michael', age: 22, city: 'London' },
      { name: 'Charlie', age: 28, city: 'San Francisco' }
    ]);

    console.log('Sample data inserted successfully');
  } finally {
    // Close the connection when done
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Call the setUpData function
StudentData().catch(console.error);
