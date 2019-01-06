import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  

async componentDidMount(){
  await fetch('http://localhost:8082/api/messages')
  .then(function(response) {
    return response.json()
  })
  .then(myJson => {
    this.setState({
      messages: myJson
    })
  })
}

messageRead = async (id) => {
  console.log('message is read', id)

  let message = {
    messageIds: [id],
    command: 'read',
    'read': true
  }

    await fetch ('http://localhost:8082/api/messages', {
    method: 'PATCH',
    body: JSON.stringify(message),
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
  })

  const updateMessages = this.state.messages.map(message => {
    if (message.id === id){
      message.read = !message.read
    }
    return message
  })
  this.setState({
    messages: updateMessages
  })
}

markAsReadButtonClicked = () => {
  const selectedMessages = this.state.messages.filter(message => message.selected === true)
  let updateMultipleMessagesAsRead = selectedMessages.map(message => {
    if(message.id === message.id){
      message.read = true 
    }
    return updateMultipleMessagesAsRead
  })
  this.setState({
    message: updateMultipleMessagesAsRead
  })
}

markAsUnreadButtonClicked = () => {
  const selectedMessages = this.state.messages.filter(message => message.selected === true)
  let updateMultipleMessagesAsUnRead = selectedMessages.map(message => {
    if(message.id === message.id){
      message.read = false
    }
    return updateMultipleMessagesAsUnRead 
  })
  this.setState({
    message: updateMultipleMessagesAsUnRead
  })
}

messageSelect = async (id) => {
  let updateSelect = this.state.messages.map(message => {
    if (message.id === id){
      message.selected = !message.selected
    }
    return message 
  })
  this.setState({
    messages: updateSelect
  })
}

starTheMessage = async (id) => {
  let updateStar = this.state.messages.map(message => {
    if (message.id === id){
      message.starred = !message.starred
    }
    return message
  })
  this.setState({
    messages: updateStar
  })
}

  render() {
    return (
      <div className="container">
        <Toolbar markAsReadButtonClicked={this.markAsReadButtonClicked} markAsUnreadButtonClicked ={this.markAsUnreadButtonClicked}/>
        <MessageList messages={this.state.messages} messageRead={this.messageRead} messageSelect={this.messageSelect} starTheMessage={this.starTheMessage}/>
      </div>
    );
  }
}
export default App; 