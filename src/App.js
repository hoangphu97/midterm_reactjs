import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebaseConfig from "./config/config"
import uiConfig from "./config/uiConfig"
import Chat from "./views/Chat"
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore , combineReducers, compose} from 'redux'
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase'
import Login from "./Login/login"
import Logout from "./Logout/logout";

firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = { isSignedIn: false }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ 
        isSignedIn: user,
        
       })
    })
    
  // var rootRef = firebase.database().ref('.info/connected');
    // console.log(rootRef);
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Sign In!</div>
            {/* <h1>Hello {firebase.auth().currentUser.displayName}</h1> */}
            <Login/>
            {/* <Logout/> */}
            {/* <Chat/> */}
            
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default App