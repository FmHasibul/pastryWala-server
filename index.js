const express = require('express');
const cors = require('cors');
const app = express();
const foods = require('./food.json')

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('pastry wala server is ruuning')
});

app.get('/foods', (req, res) => {
    res.send(foods)
})

app.listen(port, () => {
    console.log(`server is running on port = ${port}`)
})