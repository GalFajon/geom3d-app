require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT;
const fs = require('fs');
const cors = require('cors')

app.use(cors())

let pointclouds = [
    { name: 'Grassfields', dir: 'fields/cloud.js' }
];

let ifcs = [
    { name: 'Building', dir: 'test/test.ifc'}
]

app.use(express.static('static'));

app.get('/pointclouds', (req, res) => {
    res.json(pointclouds);
})

app.get('/ifcs', (req, res) => {
    res.json(ifcs);
})

app.listen(port, () => { console.log(`Listening on port: ${port}`) })