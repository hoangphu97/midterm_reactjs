import React from 'react'
import PropTypes from 'prop-types'
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from "firebase";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import uiConfig from "../config/uiConfig"
import Chat from "../views/Chat"

class Login extends React.Component {
    
    
  constructor(props) {
    super(props);
    this.pushSample = this.pushSample.bind(this);
    this.pushMessage = this.pushMessage.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      user : firebase.auth().currentUser,
    }
    }
    

  pushSample() {
    // var user = firebase.auth().currentUser;
    var name, email, photoUrl,status;

    if (this.state.user != null) {
      name = this.state.user.displayName;
      email = this.state.user.email;
      photoUrl = this.state.user.photoURL;
      status = "online";
    }
    const userInfo = { name: name, email: email, photoUrl: photoUrl , status: status }
    this.props.firebase.set(`listUser/${email.split("@gmail.com")[0]}`, userInfo)
  }

  pushMessage() {
    console.log("ABC")
    var user = firebase.auth().currentUser;
    var name , message;

    if (user != null) {
      name = user.displayName;
      message = "ABCXYZ";
    }
    const listmessage = { name: name , message : message}
    this.props.firebase.set(`listMessage/`, listmessage)
  }

  logout(){
    let status , email;

    if (this.state.user != null) {
        status = "offline"; 
        email = this.state.user.email;
      }
      const userInfo = {status: status }
      this.props.firebase.update(`listUser/${email.split("@gmail.com")[0]}`, userInfo)
        firebase.database().goOffline();
        firebase.auth().signOut()
} 

  render() {
    this.pushSample();
    //this.pushMessage();
    return (
      <div>
        <button onClick={this.logout}>Sign out!</button>
        <Chat/>
     </div>)

      // <div>{todosList}</div>
    
  }

}

export default compose(
  firebaseConnect([
    'listUser' // { path: '/todos' } // object notation
  ]),
  connect((state) => ({
    listUser: state.firebase.data.listUser,
    //listMessage : state.firebase.data.listMessage,
    // profile: state.firebase.profile // load profile
  }))
)(Login)

//export default withFirebase(AddData)
// or firebaseConnect()(Todos)
// export default Todos;