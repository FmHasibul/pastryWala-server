const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
// const foods = require('./food.json')

const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());


// https://aseleven-server.vercel.app/foods

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
            const cursor = servicesItems.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })

    }
    finally { }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('pastry wala server is ruuning')
});



app.listen(port, () => {
    console.log(`server is running on port = ${port}`)
})