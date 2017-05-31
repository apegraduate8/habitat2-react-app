import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import DB from './Database';
import Super from 'superagent';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './App.css';

class Drop extends Component {


    onDrop(){

    }

    imageDrop(file){

        console.log(file)
        let theFile = file[0]
        let filename = file[0].name
        let result = filename.split(".");
        let um = result[result.length - 1]
        console.log(um, file)
        let form = new FormData();


        for (var key in theFile){
          console.log(key, theFile[key])
          form.append(key, theFile[key])
          console.log(form)
        }
        // form.append("file", theFile)
        if(um === "png" || um === "jpg" || um === "gif"){
         Super.post('http://localhost:4000/api')
              .send(form)
              .end(function(err, result){
                    if(err){console.log(err)}
              })
        }
        console.log(form)


    }

    check(e){
        e.preventDefault()
        console.log(e.target.children[0].files)
    }


  render() {
    return (
      <div className="dz">
         <form action="" onSubmit={this.check}>
          Select a file: <input type="file" name="img" />
          <input type="submit" />
        </form>
            <Dropzone
              multiple={true}
              onDrop={this.imageDrop.bind(this)}
            >
            </Dropzone>



            <ImagesUploader
                url="http://localhost:4000/api"
                optimisticPreviews={true}
                onLoadEnd={(err, resp) => {
                    if(err){
                        console.log(err, resp);
                    }else{
                      console.log(resp)
                    }
                }}
                label="Upload multiple images"
              />

      </div>
    );
  }
}

export default Drop;


