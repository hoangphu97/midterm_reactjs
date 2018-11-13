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
    this.logout = this.logout.bind(this);
    this.state = {
      user : firebase.auth().currentUser,
    }
    }
    

  pushSample() {
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
    return (
      <div>
        <button onClick={this.logout}>Sign out!</button>
        <Chat/>
     </div>)

    
  }

}

export default compose(
  firebaseConnect([
    'listUser' 
  ]),
  connect((state) => ({
    listUser: state.firebase.data.listUser,
  }))
)(Login)