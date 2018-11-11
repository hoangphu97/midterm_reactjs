import react from 'react'
import React, { Component } from "react"
import firebase from "firebase"
import { compose } from 'redux';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux';
class Logout extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.logout = this.logout.bind(this);
    // }
    // logout(){
        // var user = firebase.auth().currentUser;
        // var name, email, photoUrl, uid, emailVerified,status;

        // if (user != null) {
        //     name = user.displayName;
        //     email = user.email;
        //     photoUrl = user.photoURL;
        //     emailVerified = user.emailVerified;
        //     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        //     // this value to authenticate with your backend server, if
        //     // you have one. Use User.getToken() instead.
        //     status = "offline";
        //   }
        //   console.log(user)
        //   const userInfo = { name: name, email: email, photoUrl: photoUrl , status: status }
        //     this.props.firebase.set(`listUser/${email.split("@gmail.com")[0]}`, userInfo)
    //         firebase.auth().signOut()
    // }
    render(){
        console.log("ABC");
        firebase.auth().signOut()
        return(<div></div>)
    }
}

// export default compose(
//     firebaseConnect([
//       'listUser' // { path: '/todos' } // object notation
//     ]),
//     connect((state) => ({
//       listUser: state.firebase.data.listUser,
//       // profile: state.firebase.profile // load profile
//     }))
//   )(Logout)

  Logout = compose ( firebaseConnect([
    'listUser' // { path: '/todos' } // object notation
  ]),
  connect((state) => ({
    listUser: state.firebase.data.listUser,
    // profile: state.firebase.profile // load profile
  })))
  
  export default Logout;