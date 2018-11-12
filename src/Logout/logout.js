import react from 'react'
import React, { Component } from "react"
import firebase from "firebase"
import { compose } from 'redux';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux';
import Chat from "../views/Chat"
class Logout extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    
    render(){
        var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified,status;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      status = "online";
    }
    const userInfo = { name: name, email: email, photoUrl: photoUrl , status: status }
    this.props.firebase.update(`listUser/${email.split("@gmail.com")[0]}`, userInfo)
        return(<div>
            <button onClick={this.logout}>Sign out!</button>
            <Chat/>
        </div>)
    }
}

export default compose(
    firebaseConnect([
      'listUser' // { path: '/todos' } // object notation
    ]),
    connect((state) => ({
      listUser: state.firebase.data.listUser,
      // profile: state.firebase.profile // load profile
    }))
  )(Logout)
