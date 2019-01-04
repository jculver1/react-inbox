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
  console.log('testing 123')
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
 
  messageRead = (id) => {
    console.log('message is read', id)
    let updateMessages = this.state.messages.map(message => {
      if (message.id === id){
        message.read = !message.read
      }
      return message
    })
    this.setState({
      messages: updateMessages
    })

}

  render() {
    return (
      <div className="container">
        <Toolbar/>
        <MessageList messages={this.state.messages} messageRead={this.messageRead}/>
      </div>
    );
  }
}
export default App; 
