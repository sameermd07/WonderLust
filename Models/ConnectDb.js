const mongoose =require('mongoose')
function connectDb(){
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/WonderLust');
        console.log("Connection successful!!!")
    }catch(err){
        console.log("Some thing went wrong while connection!!!");
    }
}
module.exports={connectDb}