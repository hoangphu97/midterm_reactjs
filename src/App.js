import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebaseConfig from "./config/config"
import uiConfig from "./config/uiConfig"
import Login from "./Login/login"

firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = { isSignedIn: false }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ 
        isSignedIn: user,
        
       })
    })
    
  }
  
  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Sign In!</div>
            <h1>Hello {firebase.auth().currentUser.displayName}</h1>
            <Login/>
          
        
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