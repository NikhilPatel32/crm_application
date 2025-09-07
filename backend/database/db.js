const mongoose = require('mongoose');

const connectToDB = async() => {
    try{
      
    }catch(error){
        console.error("MongoDB failed to connect");
        process.exit(1);
    }
}