// const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/mydb1");

const db = mongoose.connection;

db.once('open',(err)=>{
    if (err){
        console.log('Error: ${err}')
    }
    console.log("db connected")
})

module.exports = db