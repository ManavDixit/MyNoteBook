//importing db.js
const db=require('./db');
//importing express
const express=require('express');
//importing cors
const cors=require('cors');
const app=express();
//using cors middleware
app.use(cors())
const port=8000;
//connecting to mongoDb
db.connectToMongoDb();

//middleware for converting req.body to json
app.use(express.json());
//Available routes
//1) all related to authentiation
app.use('/api/auth',require('./routes/auth'));
//2)All routes related to notes
app.use('/api/notes',require('./routes/notes'));

//lisinting to express js on localhost:8000
app.listen(port,()=>{
    console.log(`connected at localhost:${port}`)
})
