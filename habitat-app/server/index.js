const express = require('express');
const app = express();
// const ejs = require('ejs')
const bodyParser = require('body-parser');
const Model = require('./model.js');
// const Cookie = require('cookie-parser')
const imageUploader = require('images-upload-middleware').default;
const corsPrefetch = require('cors-prefetch-middleware').default;
const multer = require('multer');
const aws = require("aws-sdk");
const superAgent = require('superagent');
const fileUpload = require('express-fileupload');
const config = require('./config.js');


app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'));


app.use(fileUpload());
app.use(corsPrefetch);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

aws.config.update({accessKeyId: config.AWS_ACCESS_KEY, secretAccessKey: config.AWS_SECRET_KEY, region: config.region});

//////// for dynamo db
// aws.config.update({
//   region: "us-east-1",
//   endpoint: "http://localhost:4000"
// });

let docClient = new aws.DynamoDB.DocumentClient();
let s3 = new aws.S3();



app.get('/api/Admin', (req, res) => {

    //  docClient.scan({
    //       TableName : "donators",
    //       Limit : 50
    //   }, function(err, data) {
    //       if (err) { console.log(err); return; }
    //       console.log(data);
    //       res.json(data)
    // })


    Model
      .scan(res)

});

// app.get('/api/Admin/:images', (req, res) => {
//         let user = req.params
//         console.log(user)

//           // let userParams = {
//           //  Bucket: S3_BUCKET,
//           //  Delimiter: '/',
//           //  Prefix: app.locals.userID+'/'
//           // }

//           // s3.listObjects(userParams, function (err, data) {
//           //  if(err){throw err}
//           //  console.log(data);
//           // });
//           ///////////// just save the location url after a user uploads an image

// })

app.post('/api', (req, res) => {

    if(req.files){
       console.log(req.files)
       app.locals.userID = app.locals.user.name+app.locals.user.email
         var options = {
              Bucket: config.S3_BUCKET,
              Key: app.locals.userID+"/"+req.files.imageFiles.name,
              Body: req.files.imageFiles.data,
              ContentType: req.files.imageFiles.mimetype,
              ACL: 'public-read'
            }


            Model
              .upLoad(options, app.locals, res)

    // s3.upload(options, function(err, data){
    //     if(err){return console.log("error in upload ", err)}
    //       console.log("the Location!!!!!!  >>>>>> ", data.Location)
    //     app.locals.myImages.push(data.Location)
    //     myUpdate(app.locals.myImages)
    //     res.json(data.Location)
    // })


// let myUpdate = function(myImages){
//        let rams = {
//           TableName: "donators",
//           Key:{
//               "name": app.locals.user.name
//           },
//           UpdateExpression: "set images = :r",
//           ExpressionAttributeValues:{
//               ":r": myImages
//           },
//           ReturnValues:"UPDATED_NEW"
//       };

    // console.log("Updating the item...");
    // docClient.update(rams, function(err, data) {
    //       if(err){
    //           console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    //       }else{
    //           console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    //       }
    //   });

    // }

      return true

   };
/////////    end of req.files condition


//// saves donator
if(req.body){
  console.log(req.body, req.body.name, req.body.email)
}
  Model
    .put(req.body, app.locals)

    // let putParams = {
    //     TableName: "donators",
    //     Item:{
    //         "name": req.body.name,
    //         "username": req.body.username,
    //         "email": req.body.email,
    //         "city": req.body.address,
    //         "images": []
    //     }
    // };
    // let from = Object.assign({}, req.body);
    //     app.locals.user = from;
    //     app.locals.myImages = [];
    //     docClient.put(putParams, function(err, data){
    //         if(err){
    //             console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    //         }else{
    //             console.log("Added item:", JSON.stringify(data, null, 2));
    //             getAll();
    //         }
    //     });



  // let getParams = {
  //     TableName: "donators",
  //     Key:{
  //         "name": req.body.name
  //     }
  // };

  // let gett = function(){
  //   docClient.get(getParams, function(err, data) {
  //       if (err) {
  //           console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  //       } else {
  //           console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  //       }
  //   });
  // }

  // let getAll = function(){
  //     docClient.scan({
  //           TableName : "donators",
  //           Limit : 50
  //       }, function(err, data) {
  //           if (err) { console.log(err); return; }
  //           console.log(data);
  //     })

  // }

});


app.listen(4000, () => {
    console.log("listening on port 4000 anthony")

});




//////////
//////////////////////
/////////////////////////////////
////////////////    EXTRA REFERENCES


//   let S3params = {
//    Bucket: S3_BUCKET,
//    Delimiter: '/',
//    Prefix: app.locals.userID+'/'
//   }

//   s3.listObjects(params, function (err, data) {
//    if(err){throw err}
//    console.log(data);
//   });



//////
  // var getParams = {
  //     TableName : "Donators",
  //     KeyConditionExpression: "email = "+req.body.email,
  //     ExpressionAttributeNames:{
  //         "#": "year"
  //     },
  //     ExpressionAttributeValues: {
  //         ":yyyy":1985
  //     }
  // };

 // console.log("inside the 1st condition ", req.body)

 //     var options = {
 //      Bucket: S3_BUCKET,
 //      Key: "user/"+req.body.name,
 //      Body:  JSON.stringify(from),
 //      ContentType: "application/json",
 //      ACL: 'public-read'
 //    }

 //     s3.upload(options, function(err, data){
 //        if(err){return console.log("error in upload ", err)}
 //          console.log("created folder.  ", data)
 //          app.locals.user = from
 //          res.json(data.Location)
 //    })




    // s3.getObject(myparams, function(err, data) {
    //   if (err) {
    //     console.log(err)
    //     throw err

    //   }
    //   else{
    //     console.log(data);
    //     return
    //     }
    // });





//// to scan items from table.  https://gist.github.com/bradj/4335088
/// https://www.npmjs.com/package/express-fileupload

/// https://egkatzioura.com/2016/07/30/scan-dynamodb-items-with-node-js/
/// https://stackoverflow.com/questions/28018855/upload-a-file-to-amazon-s3-with-nodejs
/// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property
/// https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingObjects.html
///.  https://stackoverflow.com/questions/30726079/aws-s3-object-listing
/// https://docs.aws.amazon.com/AmazonS3/latest/dev/GettingObjectsUsingAPIs.html
/// https://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.03.html
///. https://stackoverflow.com/questions/9437581/node-js-amazon-s3-how-to-iterate-through-all-files-in-a-bucket
/// https://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.04.html
