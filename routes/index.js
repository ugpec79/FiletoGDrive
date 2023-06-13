var express = require('express');
var router = express.Router();
const Company=require("../models/Company");
const multer=require("multer");
const fs=require("fs");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage });
const {google}=require("googleapis");
const auth=new google.auth.GoogleAuth({
  keyFile:"./cdgcKeys.json",
  scopes:['https://www.googleapis.com/auth/drive']
})

router.get('/', function(req, res, next) {
  console.log(req.query);
  Test.findOne({name:req.query.name}).then((user)=>{
    res.status(200).json({
      success:"Mil Gyi",
      userName:user
    });
  }).catch((error)=>{
    res.status(404).json({
      failure:"Not Found",
      err:error
    })
  })
 
});
router.post('/',function(req,res){
  console.log(req.body);
  const test=new Test({
    name:req.body.name
  });
  test.save().then(()=>{
    res.status(200).json({
      success:"Mil Gyi again"
    })
  });

  
});
router.post("/uploadDoc",upload.single("file"),async function(req,res){
  console.log(req.file);
  res.send("0");
  const driveService=google.drive({version:'v3',auth});
  let fileMetadata={
    'name':req.file.originalname,
    'parents':['1mntHhyydrh0dad4AHKIKE3vlsEkfC4iQ']
  }
  let media={
    mimeType:req.file.mimetype,
    body: fs.createReadStream(req.file.path)
  }
  const response= await driveService.files.create({
    resource:fileMetadata,
    media:media,

  })
  // Delete a file from GDrive
  //driveService.files.delete({ 
    //fileId:fileId
  //})
  //Save to DB the company and its DOC Url
  console.log(response);
 
    fs.unlink(req.file.path, (err)=>{
        if(err){
            res.status(500);
        }
        else{
            res.status(200).json({
              success:"File Uploaded"
            });

        }
    })

})




module.exports = router;
