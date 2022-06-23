
const express = require('express');

const { recordRouter } = require('./routes/records.routes');
const { db } = require('./utils/database.util');
const app = express();


app.use(express.json());


app.use('/records', recordRouter);

db.authenticate()
    .then(()=>console.log('db authenticated'))
    .catch(err => console.log(err));

db.sync()
    .then(()=>console.log('database Sync'))
    .catch(err => console.log(err));


app.listen(4001,()=>{
    console.log('express app running!');
});