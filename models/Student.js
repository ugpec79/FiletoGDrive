const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    sid:{
        type:Number,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    ctc:{
        type:String,
        required:true
    },
    typePlace:{
        type:String,
        required:true
    },
    yop:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:false
    }

})

const Student = mongoose.model("students", StudentSchema);
module.exports=Student;