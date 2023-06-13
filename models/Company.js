const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyname:{
        type:String
    },
    companyDoc:{
        type:String
    }
})

const Company = mongoose.model("tests", CompanySchema);
module.exports=Company;