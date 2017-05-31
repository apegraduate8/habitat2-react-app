const aws = require("aws-sdk");
const config = require('./config.js');
aws.config.update({accessKeyId: config.AWS_ACCESS_KEY, secretAccessKey: config.AWS_SECRET_KEY, region: "us-east-1"});

let Database = {

 docClient: new aws.DynamoDB.DocumentClient(),

 s3: new aws.S3(),

 scan:  function(res){
            this.docClient.scan({
              TableName : "donators",
              Limit : 50
          }, function(err, data) {
              if (err) { console.log(err); return; }
              console.log(data);
              res.json(data)
        })
      },
upLoad: function(opt, locals, res){
  let self = this
   this.s3.upload(opt, function(err, data){
        if(err){return console.log("error in upload ", err)}
          console.log("the Location!!!!!!  >>>>>> ", data.Location)
        locals.myImages.push(data.Location)
        self.myUpdate(locals)
        res.json(data.Location)
    })
},

myUpdate: function(locals){
       let rams = {
          TableName: "donators",
          Key:{
              "name": locals.user.name
          },
          UpdateExpression: "set images = :r",
          ExpressionAttributeValues:{
              ":r": locals.myImages
          },
          ReturnValues:"UPDATED_NEW"
      };

    console.log("Updating the item...");
    this.docClient.update(rams, function(err, data) {
          if(err){
              console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
          }else{
              console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          }
      });

    },

put: function(reqBody, locals){

       let putParams = {
        TableName: "donators",
        Item:{
            "name": reqBody.name,
            "username": reqBody.username,
            "email": reqBody.email,
            "city": reqBody.address,
            "images": []
        }
    };
    let from = Object.assign({}, reqBody);
        let self = this;
        locals.user = from;
        locals.myImages = [];

         let getParams = {
                TableName: "donators",
                Key:{
                    "name": reqBody.name
                }
            };
        this.docClient.put(putParams, function(err, data){
            if(err){
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            }else{
                console.log("Added item:", JSON.stringify(data, null, 2));
                self.getAll(getParams);
            }
        });

  },

 gett: function(GParams){
    docClient.get(GParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
  },

  getAll: function(GParams){
        this.docClient.get(GParams, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
  }


};



module.exports = Database;
