import React from 'react';
import '../App.css';
import Message from './Message.js'

const MessageList = (props) => {
    return (
     props.messages.map(message => {
       return <Message message={message} messageSelect={props.messageSelect} starTheMessage={props.starTheMessage} addBodyOfMessage={props.addBodyOfMessage} bodyId={props.bodyId}/>
     })
    )
  }

export default MessageList