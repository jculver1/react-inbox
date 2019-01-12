import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Compose from './components/compose'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      toggle : false,
      bodyOfMessage: true
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

deleteMessage = async () => {
  var newMessages = this.state.messages.filter(message => !message.selected)
  var newMessagesId = this.state.messages.map(message => message.id)
  this.updates(newMessagesId, 'delete', 'delete', true)
  this.setState({
    messages: newMessages
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

countUnreadMessages = () => {
  let unreadMessages = this.state.messages.filter(message => message.read === false)
   return unreadMessages.length
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

applyLabel = (event) => {
 event.preventDefault()
  let findSelected = this.state.messages.map(message => {
    if(message.selected === true && !message.labels.includes(event.target.value)){
      message.labels.push(event.target.value)
     // this.updates(message.id, 'addLabel', 'label', message.labels.push(event.target.value))
    }return message
  })
  this.setState({
    messages: findSelected
  })
}

removeLabel = (event) => {
   let findSelected = this.state.messages.map(message => {
     if(message.selected === true && message.labels.includes(event.target.value)){
      let index = message.labels.indexOf(event.target.value)
      console.log(message.id, index)
       message.labels.splice(index, 1)
       //this.updates(message.id, 'removeLabel', 'label', message.labels.push(event.target.value))
     }return message
   })
   this.setState({
     messages: findSelected
   })
 }

composeForm = () => { 
      this.setState({
        toggle: !this.state.toggle
  })
  }

// getBodyofEmail = (event) => {
//   let getBody
// }

subjectOfEmail = (event) => {
  event.preventDefault()
  let subject = event.target.value
  return subject
}

bodyofEmail = (event) => {
  event.preventDefault()
  let body = event.target.value 
  return body
}

submitForm = (event) => {
  event.preventDefault()
  let bodyEvent = this.bodyofEmail()
  let subjectEvent = this.subjectOfEmail()
  let submitEvent = () => {
    let newMessage = {
      body: bodyEvent,
      id: this.state.messages.length + 1,
      labels: [],
      read: false,
      selected: false,
      starred: false,
      subject: subjectEvent
    }
    return newMessage

  }
  this.setState({
    messages: {submitEvent, ...this.state.messages} 
  })
  }

  addBodyOfMessage = (id) => {
    this.state.messages.map(message => {
      if (message.id === id){
        return message.body
      }
      return message
    })
}

  render() {
    return (
      <div className="container">
        <Toolbar markAsReadButtonClicked={this.markAsReadButtonClicked} markAsUnreadButtonClicked={this.markAsUnreadButtonClicked} selectAll={this.selectAll} messages={this.state.messages} changeButtonSelect={this.changeButtonSelect} deleteMessage={this.deleteMessage} applyLabel={this.applyLabel} removeLabel={this.removeLabel} countUnreadMessages={this.countUnreadMessages} composeForm={this.composeForm}
        />
        <div> {this.state.toggle ? <Compose submitForm={this.submitForm} bodyofEmail={this.bodyofEmail} subjectOfEmail={this.subjectOfEmail}/> : ''}
        </div>
        <MessageList messages={this.state.messages} messageSelect={this.messageSelect} starTheMessage={this.starTheMessage} addBodyOfMessage={this.addBodyOfMessage} bodyOfMessage={this.state.bodyOfMessage}
        />
      </div>
    );
  }
}
export default App; 
