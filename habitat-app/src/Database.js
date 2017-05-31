const r = require('rethinkdb');

let config = {db: process.env.RDB_DB || "habitat", host: "localhost", port: 28015}
let database = {

    setup: function(callback){
        r.connect(config, function(err, conn){
          console.log("started setup", conn, config)
            callback(conn, err)
        })
    },



    save: function(IMG){
      console.log("inside the save  ", IMG)
      // myImage = {
      //   fileName: IMG[0].name,
      //   fileType: IMG[0].type,
      //   file: IMG[0].preview
      // }
      console.log(this)

          this.setup(function(conn, err){
              console.log(conn)
            //   r.table("images").insert(IMG).run(conn)
            //   .then(result => {console.log(result)})
            //   .error(err => {console.log(err)})
            })
      }


}

module.exports = database;


//// r.dbCreat("habitat")
//// rehtinkdb-regrid  https://github.com/internalfx/rethinkdb-regrid
