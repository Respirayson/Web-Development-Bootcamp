const { MongoClient } = require("mongodb");
// Connection URI
const uri =
  "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const database = client.db("fruitsDB");
    console.log("Connected successfully to server");

    const collection = database.collection("fruits");
    
    // Inserting into collection
    const fruits = [
        {
            name: "Banana",
            rating: 5,
            review: "Chewy"
        },
        {
            name: "Apple",
            rating: 5,
            review: "Crunchy"
        },
        {
            name: "Grape",
            rating: 5,
            review: "Sweet"
        }
    ]
    const result = await collection.insertMany(fruits);
    console.log("Documents inserted");



    // Reading from the collection
    const cursor = collection.find()

    if ((await cursor.length) === 0) {
        console.log("No documents found!");
      }

    await cursor.forEach(console.dir)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);