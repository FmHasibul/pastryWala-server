const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
// const foods = require('./food.json')

const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());


// 


// pastryWala user
// password x8JIpYbT5TUUoMOQ

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@first.y0k3i0t.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const servicesItems = client.db('pastrywala').collection('services');

        app.get('/foods', async (req, res) => {

            const query = {}
            const limit = parseInt(req.query.limit)
            const cursor = servicesItems.find(query)
            const services = await cursor.limit(limit).toArray();
            res.send(services)
        })
        app.post('/foods', async (req, res) => {
            const newService = req.body
            const result = await servicesItems.insertOne(newService)
            res.json(result)
        })
        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await servicesItems.findOne(query)
            res.json(result)
        })
        app.put('/foods/:id', async (req, res) => {
            const id = req.params.id
            const update = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateObj = {
                $set: {
                    review: update.review
                }
            }
            const result = await servicesItems.updateOne(filter, updateObj, options)
            res.json(result)
        })
    }
    finally { }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('pastryWala server is ruuning')
});



app.listen(port, () => {
    console.log(`server is running on port = ${port}`)
})