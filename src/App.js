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
        message.selected = false
      }
    )
    this.setState({
      messages: myJson
    })
  })
}

updates = async (id, command, prop, value) => {
  let message = {
    messageIds: [id],
    command: command,
    [prop]: value
  }
    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
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

markAsReadButtonClicked = async () => {
  let updateMultipleMessagesAsRead = this.state.messages.map(message => { 
    if(message.selected === true){
      message.read = true 
      this.updates(message.id, 'read', 'read', true)
    } 
  return message 
  })
  this.setState({
    messages: updateMultipleMessagesAsRead
  })
}

markAsUnreadButtonClicked = async () => {
  let updateMultipleMessagesAsUnRead = this.state.messages.map(message => {
    if(message.selected === true){
      message.read = false
      this.updates(message.id, 'read', 'read', false)
    }
    return message  
  })
  this.setState({
    messages: updateMultipleMessagesAsUnRead
  })
}

 selectAll = async () => {
  let checkifChecked = this.state.messages.every(message => message.selected === true)
  let updateSelectAll = this.state.messages.map(message => {
    checkifChecked ? message.selected = false : message.selected = true 
    return message 
  }) 
  this.setState({
     messages: updateSelectAll
   })
 }

 changeButtonSelect = () => {
   let className = ''
  this.state.messages.map(message => {
    if(this.state.messages.every(message => message.selected === false)){
      className='fa fa-check-square-o'
    }else if(this.state.messages.every(message => message.selected === true)){
      className='fa fa-check-square-o'
    } return className 
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
  this.updates(id, 'star', 'star', true)
}

deleteMessage = async () => {
  let messages = this.state.messages
  for (let i =0; i<  messages.length; i++){
    if(messages[i].selected === true){
      messages.splice(i, 1) 
    }
    return messages 
  }
  this.setState({
    messages: messages
  })
}


applyLabel = (event) => {
  event.preventDefault()
  console.log(event.target.value)
  // let getSelected = this.state.messages.map(message => {

  // })
}

  render() {
    return (
      <div className="container">
        <Toolbar markAsReadButtonClicked={this.markAsReadButtonClicked} markAsUnreadButtonClicked={this.markAsUnreadButtonClicked} selectAll={this.selectAll} messages={this.state.messages} changeButtonSelect={this.changeButtonSelect} deleteMessage={this.deleteMessage} applyLabel={this.applyLabel}/>
        <MessageList messages={this.state.messages} messageSelect={this.messageSelect} starTheMessage={this.starTheMessage}
        />
      </div>
    );
  }
}
export default App; 
