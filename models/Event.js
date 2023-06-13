const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    scDate:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }
})

const Event = mongoose.model("events", EventSchema);
module.exports=Event;