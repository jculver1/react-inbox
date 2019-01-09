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
    myJson.map(message => {
      if (!message.selected){
        message.selected = false
      }}
    )
    this.setState({
      messages: myJson
    })
  })
}

// updates = async (id, command, prop, value) => {
//   let message = {
//     messageIds: [id],
//     command: command,
//     [prop]: value
//   }
//     await fetch("http://localhost:8082/api/messages", {
//       method: "PATCH",
//       body: JSON.stringify(message),
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       }
//     })
//   }

messageRead = async (id) => {
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
  //  updates(id, 'read', 'read', true) 
}

messageSelect = async (id) => {
  const updateSelect = this.state.messages.map(message => {
    if (message.id === id){
      message.selected = !message.selected
    }
    return message 
  })
  this.setState({
    messages: updateSelect
  })
}

markAsReadButtonClicked = () => {
  const selectedMessages = this.state.messages.filter(message => message.selected === true)
  let updateMultipleMessagesAsRead = selectedMessages.map(message => {
      message.read = true 
    return updateMultipleMessagesAsRead
  })
  this.setState({
    message: updateMultipleMessagesAsRead
  })
}

markAsUnreadButtonClicked = () => {
  const selectedMessages = this.state.messages.filter(message => message.selected === true)
  let updateMultipleMessagesAsUnRead = selectedMessages.map(message => {
      message.read = false
      return updateMultipleMessagesAsUnRead 
  })
  this.setState({
    message: updateMultipleMessagesAsUnRead
  })
}

updateSelectAll = () => {   
  const updateSelect = this.state.messages.map(message => {
    if(message.selected === false){
       message.selected = true
    }else if(message.selected === true){
      message.selected = false
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

// addLabels = async (event) => {
//   let arrayOfLabelsSelected = event.target.value 
//   let findSelected = this.state.messages.map(message => {
//     if (message.selected === true){
//       return message.id
//       //message.labels = arrayOfLabelsSelected
//     }
//   let updateLabels = findSelected.map(message => messages.labels)
//     return message 
//   })
//   this.setState({
//     messages: updateLabels
//   })
// }

  render() {
    return (
      <div className="container">
        <Toolbar markAsReadButtonClicked={this.markAsReadButtonClicked} markAsUnreadButtonClicked ={this.markAsUnreadButtonClicked} selectAllMessages={this.selectAllMessages} updateSelectAll={this.updateSelectAll}/>
        <MessageList messages={this.state.messages} messageRead={this.messageRead} messageSelect={this.messageSelect} starTheMessage={this.starTheMessage}/>
      </div>
    );
  }
}
export default App; 
