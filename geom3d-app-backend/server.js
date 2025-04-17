require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT;
const fs = require('fs');

let pointclouds = [
    { name: 'Grassfields', dir: 'fields/cloud.js' }
];

app.use(express.static('static'));

app.get('/pointclouds', (req, res) => {
    res.json(pointclouds);
})

app.listen(port, () => { console.log(`Listening on port: ${port}`) })