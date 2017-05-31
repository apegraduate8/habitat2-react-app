import React, { Component } from 'react';

import './App.css';

class Form extends Component {

  constructor(props){
    super(props)
    this.input = ""
    this.state = {
      nameValue: "",
      userNameValue: "",
      emailValue: "",
      addressValue: "",
      final: ""
    }
  }


  componentDidMount(){
    console.log(this.state);
  }
  handleNameChange(e){
     this.input = e.target.value

        this.setState(state => {
          state.nameValue = this.input
        })
  }
   handleUserNameChange(e){
     this.input = e.target.value

        this.setState(state => {
          state.userNameValue = this.input
        })
  }

  handleEmailChange(e){
     this.input = e.target.value
              this.setState(state => {
           state.emailValue = this.input
        })

  }
  handleAddressChange(e){
     this.input = e.target.value
        this.setState(state => {
          addressValue: state.addressValue = this.input
        })
  }

  handleSubmit(e){
        e.preventDefault();
        let fm = {}
          fm.name = this.state.nameValue
          fm.username = this.state.userNameValue
          fm.email = this.state.emailValue
          fm.address = this.state.addressValue

       console.log(fm)
          this.props.get(fm)
  }

  submitRequest(e){

       if(typeof this.props.formData === "object"){
        this.props.get(true)
       }
  }

  render() {
    let colors = {
      green: "#7ab952",
      blue: "#314d89",
      orange: "#ef4f37"
    }
    let styles = {
      backgroundColor: colors.green
    }
    return (
      <div className="form">
      <h1 style={{marginBottom: "20px"}}> Donation Request From </h1>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label className="firstLabel">
          <span>Name:</span>
          <input type="text" value={this.state.nameValue} onChange={ (e) => this.handleNameChange(e) } />
        </label>
        <label className="username">
          <span>UserName:</span>
          <input type="text" value={this.state.userNameValue} onChange={ (e) => this.handleUserNameChange(e) } />
        </label>
        <label>
          <span>Email:</span>
          <input type="email" value={this.state.emailValue} onChange={ (e) => this.handleEmailChange(e) } />
        </label>
        <label>
          <span>City:</span>
          <input type="text" value={this.state.addressValue} onChange={ (e) => this.handleAddressChange(e) } />
        </label>
        <input type="submit" value="Select Images" style={styles}/>
      </form>
            <button onClick={() => {this.submitRequest()}} className="requestButton"> Submit request </button>
      </div>
    );
  }
}

export default Form;

