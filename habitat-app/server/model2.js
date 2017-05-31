
const r = require('rethinkdb');

let config = {db: process.env.RDB_DB || "habitat", host: "localhost", port: 28015}
let database = {

    setup: function(callback){
        r.connect(config, function(err, conn){
          console.log("started setup")
            callback(conn, err)
        })
    },



    save: function(IMG){
      console.log("inside the save  ", IMG.imageFiles)
      myImage = {
        userID: IMG.user,
        fileName: IMG.imageFiles.name,
        fileType: IMG.imageFiles.mimetype,
        file: IMG.imageFiles.data
      }

          this.setup(function(conn, err){

              r.table("images").insert(myImage).run(conn)
              .then(result => {console.log(result)})
              .error(err => {console.log(err)})
            })
      }


}

module.exports = database;


//// r.dbCreat("habitat")
//// rehtinkdb-regrid  https://github.com/internalfx/rethinkdb-regrid


