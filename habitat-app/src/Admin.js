import React, { Component } from 'react';
// import {Link} from "react-router-dom";
import Super from 'superagent';
import './App.css';

class Admin extends Component {
      constructor(props){
        super(props)
        this.state = {
          allRequests: null,
          currentImages: null
        }

      }

  componentDidMount(){
        Super('GET', 'http://localhost:4000/api/Admin')
        .then(result => {
          if(result){
            console.log("success in the componentDidMount !!   ", result.body.Items);
             this.setState({allRequests: result.body.Items})
           }
        })
        .catch(err => { if(err){console.log("error! ", err)} })
    }

    addUserImages(Adminimages){
      console.log("in the addUserImages  ", Adminimages)
        this.setState({currentImages: Adminimages})
    }

      showAll(){
        let self = this;
          if(this.state.allRequests){
                return this.state.allRequests.map((el, index) => {
                  // let con = el.name+el.email
                   return(
                        <tr key={index}>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.city}</td>
                            <td onClick={(e) => {self.addUserImages(el.images)}} className="images"> Images </td>
                        </tr>

                        )
               })
          }

      }


      showImages(){
        console.log("in the show", )
          if(this.state.currentImages !== null ){
            return this.state.currentImages.map((image, index) => {
              console.log(image)
              let imageStyle = {
                width: "90%",
                height: "100%",
                margin: "20px",
                backgroundImage: `url(${image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }
              return(

                  <div key={index} style={imageStyle}> </div>
                )
            })


          }
      }




  render() {
        console.log(this.state)
    return (
          <div className="AppAdmin">
                   <div className="Table">
                    <table>
                       <tr>
                        <th>first name</th>
                        <th>email</th>
                        <th>city</th>
                      </tr>
                      {this.showAll()}
                    </table>
                  </div>

                  <div className="displayImages">
                        {this.showImages()}
                  </div>
          </div>
    );
  }
}

export default Admin;

