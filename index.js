const express = require('express');
const path = require('path');


const port = 9000;
const fs = require('fs');


const app = express();
// const db = require('./config/mongoose.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hellorahulnkm:Rahul2356@cluster0.azpj1ka.mongodb.net/myDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>console.log("DB connected"))
  .catch((err)=>console.log(err))


const St = require('./models/Student.js');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use("/uploads",express.static(path.join(__dirname,'uploads')));



app.use('/', require('./routes'));
app.use('/post', require('./routes/post'))


app.listen(port,(err)=>{
    if(err){
        console.log("Something Wrong");
        return false;
    }
    console.log("Server created");
})