import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Super from 'superagent';
import Form from './Form';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './App.css';

class Drop extends Component {

                constructor(props){
                  super(props)

                  this.state = {
                    formData: "",
                    complete: undefined
                  }
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
    getFormData(data){
          console.log("from the drop Component. ", data)
          if(data === true){return this.setState({complete: data})}

          this.setState({formData: data})
           Super.post('http://localhost:4000/api')
            .send(data)
            .end(function(er, res){
                  if(er){return console.log(er)}
                  if(res){console.log(res)}
            })
    }

      theCenter(){
         if(typeof this.state.formData === "object"){
          return(
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
                inputId={this.state.formData.name}
              />
            )
        }
      }

      pendingRequest(){

        if(this.state.complete){
          return(
              <div className="complete">
                  <h1> Thank you for your donation request <br />
                      An administrator will contact you soon about the status of your request
                   </h1>
              </div>
            )
        }
      }



  render() {

    return (
      <div className="dz">
              {this.pendingRequest()}
              <Form get={ this.getFormData.bind(this)} formData={this.state.formData}/>

              {this.theCenter()}

      </div>
    );
  }
}

export default Drop;

