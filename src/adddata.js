import React from 'react'
import PropTypes from 'prop-types'
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from "firebase";
class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.pushSample = this.pushSample.bind(this);
  }

  pushSample() {
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
    this.props.firebase.set(`listUser/${email.split("@gmail.com")[0]}`, userInfo)
  }

  render() {
    this.pushSample();
    // console.log(this.props.listUser)
    // const todosList = !isLoaded(this.props.listUser)
    //   ? 'Loading'
    //   : isEmpty(this.props.listUser)
    //     ? 'Todo list is empty'
    //     : Object.keys(this.props.listUser).map(
    //       (key, id) => (
    //         <div>{this.props.listUser[key].name}</div>
    //       )
    //     )
    return (
        <div></div>
      // <div>{todosList}</div>
    )
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
)(AddData)
//export default withFirebase(AddData)
// or firebaseConnect()(Todos)
// export default Todos;