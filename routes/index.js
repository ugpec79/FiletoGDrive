// This code represents sending of files from server to Google Drive via uploading of files from /uploadDoc route

//importing of express, multer and fs for handling files from the post route and creation of middleware.
var express = require('express');
var router = express.Router();
const multer=require("multer");
const fs=require("fs");
// Specifying storage conditions for the middleware which are:
// 1. Specifying the temporary upload directory 'uploads/'.
// 2. Specifying the filename after getting the file.
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
// Importing google apis module in order to connect with google drive
const {google}=require("googleapis");

// Authentication keys and the path of drive folder being updated
const auth=new google.auth.GoogleAuth({
  keyFile:"./cdgcKeys.json",
  scopes:['https://www.googleapis.com/auth/drive']
})

// Specifying the route of uploading the file.
router.post("/uploadDoc",upload.single("file"),async function(req,res){
  console.log(req.file);
  // declaring the drive service and the file from the request.
  const driveService=google.drive({version:'v3',auth});
  let fileMetadata={
    'name':req.file.originalname,
    'parents':['1mntHhyydrh0dad4AHKIKE3vlsEkfC4iQ']
  }
  let media={
    mimeType:req.file.mimetype,
    body: fs.createReadStream(req.file.path)
  }
  //Getting response after uploading the file.
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
 // After uploading the file removing the file from temporary folder and sending the response to the request
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


// exporting the route in app.js file.

module.exports = router;
