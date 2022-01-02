const mongoose=require('mongoose');
dbUrl='mongodb://localhost:27017/myNotebook';
const connectToMongoDb=()=>{
    mongoose.connect(dbUrl,()=>{
        console.log('connected successfuly to mongoDb');
    })
}
module.exports.connectToMongoDb=(connectToMongoDb);
