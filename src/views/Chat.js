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
      currentUser: firebase.auth().currentUser,
      input: "",
      username: "",
      photoUrl: "",
      messageSingle: "",
      history: [],
    }
  }

  isExistPath = (path, messageList) => {
    let i = 0;
    while (Object.keys(messageList)[i] != null || Object.keys(messageList)[i] !== undefined) {
      if (Object.keys(messageList)[i] === path) {
        return true;
      }
      i++;
    }
    return false;
  }

  showUser = (user) => {
    this.setState({
      username: user.name,
      photoUrl: user.photoUrl,
    })

  }

  search = (e) => {
    let username = e.target.value;
    this.setState({ input: username })
  }

  chat = () => {
    if (this.state.messageSingle && this.state.messageSingle.length > 0) {
      let message, name;

      if (this.state.currentUser != null) {
        name = this.state.currentUser.displayName;
        message = this.state.messageSingle;
      }
      const messageUser = { message: message, name: name }

      var key1 = this.state.currentUser.displayName + "&" + this.state.username;

      if (this.isExistPath(key1, this.props.listMessage)) {
        this.props.firebase.push(`listMessage/${this.state.currentUser.displayName}&${this.state.username}`, messageUser)
      } else {
        this.props.firebase.push(`listMessage/${this.state.username}&${this.state.currentUser.displayName}`, messageUser)
      }
      this.setState({ messageSingle: null })
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
    var htr = null;

    if (this.state.username !== "") {

      var conversation = "";
      var key1 = this.state.currentUser.displayName + "&" + this.state.username;
      var key2 = this.state.username + "&" + this.state.currentUser.displayName;


      const messageList = !isLoaded(this.props.listMessage)
        ? 'Loading'
        : isEmpty(this.props.listMessage)
          ? 'Message is empty'
          : this.props.listMessage

      var path1 = this.state.currentUser.displayName + "&" + this.state.username;
      var path = this.state.username + "&" + this.state.currentUser.displayName;


      if (this.isExistPath(path1, messageList)) {

        conversation = key1;
        htr = Object.keys(messageList[conversation]).map(
          (key, index) => (
            (messageList[conversation][key].name === this.state.currentUser.displayName) ?

              <li key={key}>
                <div class="message-data">
                  <span class="message-data-name"><i class="fa fa-circle online"></i> {this.state.currentUser.displayName}</span>
                  {/* <span class="message-data-time">10:12 AM, Today</span> */}
                </div>
                <div class="message my-message">
                  {messageList[conversation][key].message}
                </div>
              </li> :
              <li class="clearfix" key={key}>
                <div class="message-data align-right">
                  {/* <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp; */}
                  <span class="message-data-name" >{this.state.username}</span> <i class="fa fa-circle me"></i>

                </div>
                <div class="message other-message float-right">
                  {messageList[conversation][key].message}
                </div>
              </li>
          )

        )

      } else if (this.isExistPath(path, messageList)) {

        conversation = key2;
        htr = Object.keys(messageList[conversation]).map(
          (key, index) => (
            (messageList[conversation][key].name === this.state.currentUser.displayName) ?

              <li key={index}>
                <div class="message-data">
                  <span class="message-data-name"><i class="fa fa-circle online"></i> {this.state.currentUser.displayName}</span>
                  {/* <span class="message-data-time">10:12 AM, Today</span> */}
                </div>
                <div class="message my-message">
                  {messageList[conversation][key].message}
                </div>
              </li> :
              <li class="clearfix" key={index}>
                <div class="message-data align-right">
                  {/* <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp; */}
                  <span class="message-data-name" >{this.state.username}</span> <i class="fa fa-circle me"></i>

                </div>
                <div class="message other-message float-right">
                  {messageList[conversation][key].message}
                </div>
              </li>
          )

        )

      }

    }



    const listConnect = !isLoaded(this.props.listUser)
      ? 'Loading'
      : isEmpty(this.props.listUser)
        ? 'Message is empty'
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
            <img src={this.state.photoUrl} alt="avatar" style={{ width: "40px" }} />

            <div class="chat-about">
              <div class="chat-with">Chat with {this.state.username}</div>
            </div>
            <i class="fa fa-star star-cursor"></i>
          </div>

          {/* <!-- end chat-header --> */}


          <div class="chat-history">
            <ul>
              {this.state.username !== null ? htr : this.state.history}
            </ul>

          </div>
          {/* <!-- end chat-history --> */}

          <div class="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" onChange={(e) => this.setState({ messageSingle: e.target.value })} placeholder="Type your message" rows="3"></textarea>

            <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
    <i class="fa fa-file-image-o"></i>

            <button onClick={() => this.chat()}>Send</button>

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
    listMessage: state.firebase.data.listMessage,
  }))
)(Chat)