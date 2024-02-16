const {MongoClient} = require('mongodb');

const uri = 'mongodb://localhost:27017';

const dbName = 'StudDatabase';

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

async function queryDocuments() {
    try{
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        const collectionName = 'students';
        const collection = db.collection(collectionName);

        const checkQuery = await collection.find({ city: 'New York' }).toArray();
        console.log('Details for city - New York');
        console.log(checkQuery);

        const lessThanQuery = await collection.find({ age: {$lt: 25 }}).toArray(); //$lte
        console.log('Details of students whose age are less than 25');
        console.log(lessThanQuery);

        const greaterThanQuery = await collection.find({ age: {$gt: 25 }}).toArray(); //$gte
        console.log('Details of students whose age are greater than 25');
        console.log(greaterThanQuery);

        //Imagine hobbies entry is available in the database/documents
        const inArrayQuery = await collection.find({ hobbies: {$in: ['Reading', 'Coding'] }}).toArray();
        console.log('Documents with hobbies - "Reading" and "Coding"');
        console.log(inArrayQuery);

        const regexQuery = await collection.find({ name: /^A/ }).toArray(); 
        console.log('Details of students whose name starts with letter A');
        console.log(regexQuery);

    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

queryDocuments().catch(console.error);