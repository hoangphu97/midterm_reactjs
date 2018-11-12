import React, { Component } from 'react'
import "./Chat.css";
import firebase from "firebase";
import PropTypes from 'prop-types'
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux';
import { connect } from 'react-redux';
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      currentUser : firebase.auth().currentUser,
      input: "",
      username: "",
      photoUrl: "",
      messageSingle : "",
    }
  }

  showUser = (user) => {
    this.setState({
      username: user.name,
      photoUrl: user.photoUrl
    })
  }

  search = (e) => {
    let username = e.target.value;
    this.setState({ input: username })
  }

  chat = () => {
    if(this.state.messageSingle && this.state.messageSingle.length > 0){
      let message,name;

    if (this.state.currentUser != null) {
        name = this.state.currentUser.displayName;
        message = this.state.messageSingle;
    }
     const messageUser = { message : message, name: name}
    this.props.firebase.push(`listMessage/${this.state.currentUser.displayName}&${this.state.username}`, messageUser) 
    var key = this.state.currentUser.displayName + "&" + this.state.username;
    console.log(key);
    console.log(this.props.listMessage[key]);

      document.getElementById("message-to-send").value = ""; 
    }
    
  }

  render() {
    const style1 = {
      color: "#AED2A6"
    }
    const style2 = {
      color: "#DAE9DA"
    }

    
    
    // Object.keys(this.props.listMessage).map(
    //   (key, id) => (
    // console.log(this.props.listMessage[key])
    // ))
    // const listMessage = !isLoaded(this.props.listMessage)
    //   ? 'Loading'
    //   : isEmpty(this.props.listMessage)
    //     ? 'List Message is empty'
    //     : Object.keys(this.props.listMessage).map(
    //       (key,id) => (
            
    //         <div class="chat-history">
    //         <ul>
    //           <li class="clearfix">
    //             <div class="message-data align-right">
    //       <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>

    //             </div>
    //             <div class="message other-message float-right">
    //               Hi Vincent, how are you? How is the project coming along?
    //             </div>
    //           </li>

    //           <li>
    //             <div class="message-data">
    //               <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
    //               <span class="message-data-time">10:12 AM, Today</span>
    //             </div>
    //             <div class="message my-message">
    //               Are we meeting today? Project has been already finished and I have results to show you.
    //     </div>
    //           </li>
    //         </ul>

    //       </div>
    //       )
    //     )
    
    const listConnect = !isLoaded(this.props.listUser)
      ? 'Loading'
      : isEmpty(this.props.listUser)
        ? 'Todo list is empty'
        : Object.keys(this.props.listUser).map(
          (key, id) => (
            String(this.props.listUser[key].name).toLowerCase().includes(String(this.state.input).toLowerCase()) ?
              <li key={key} class="clearfix" style={{ cursor: "pointer" }} onClick={() => this.showUser(this.props.listUser[key])}>
                <img src={this.props.listUser[key].photoUrl} alt="avatar" style={{ width: "40px" }} />
                <div class="about">
                  <div class="name">{this.props.listUser[key].name}</div>
                  <div class="status">
                    <i class="fa fa-circle online">{this.props.listUser[key].status}</i>
                  </div>
                </div>
              </li> : null
          )
        )

    return (

      <div class="container clearfix">
        {
          <div class="people-list" id="people-list" >
            <div class="search">
              <input type="text" id="search" name="search" placeholder="search" value={this.props.search} onChange={(e) => { this.search(e) }} />
              <i class="fa fa-search"></i>
            </div>
            <ul class="list">
              {listConnect}
            </ul>
          </div>
        }
        <div class="chat">
          <div class="chat-header clearfix">
            <img src={this.state.photoUrl} alt="avatar" style={{ width: "40px" }}  />

            <div class="chat-about">
              <div class="chat-with">Chat with {this.state.username}</div>
            </div>
            
          </div>

          {/* <!-- end chat-header --> */}
          

          <div class="chat-history">
            <ul>
              <li class="clearfix">
                <div class="message-data align-right">
                  <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
          <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>

                </div>
                <div class="message other-message float-right">
                  Hi Vincent, how are you? How is the project coming along?
        </div>
              </li>

              <li>
                <div class="message-data">
                  <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                  <span class="message-data-time">10:12 AM, Today</span>
                </div>
                <div class="message my-message">
                  Are we meeting today? Project has been already finished and I have results to show you.
        </div>
              </li>
            </ul>

          </div>
          {/* <!-- end chat-history --> */}

          <div class="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" onChange= {(e) =>  this.setState({messageSingle : e.target.value})} placeholder="Type your message" rows="3"></textarea>

            <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
    <i class="fa fa-file-image-o"></i>

            <button onClick = {() => this.chat()}>Send</button>

          </div>
          {/* <!-- end chat-message --> */}

        </div>
        {/* <!-- end chat --> */}

      </div>
      // <!-- end container -->
    )
  }
}

export default compose(
  firebaseConnect(['listMessage']),
  connect((state) => ({
    listUser: state.firebase.data.listUser,
    listMessage : state.firebase.data.listMessage,
  }))
)(Chat)