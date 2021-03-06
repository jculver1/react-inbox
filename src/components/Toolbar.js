import React from 'react';
import '../App.css';


const Toolbar =(props) => {
    return (
        <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{props.countUnreadMessages()}</span>
            unread messages
          </p>

        <a class="btn btn-danger" onClick={props.composeForm}>
            <i class="fa fa-plus"></i>
        </a>
          <button className="btn btn-default" onClick={()=> props.selectAll()}> 
            <i className={props.messages.every(message => message.selected === true) ? 'fa fa-check-square-o' 
            : props.messages.every(message => message.selected === false) ? 'fa fa-minus-square-o' 
            : 'fa fa-square-o'}></i>
          </button>
      
          <button className="btn btn-default" onClick={()=> props.markAsReadButtonClicked()}>
            Mark As Read
          </button>
      
          <button className="btn btn-default" onClick={()=> props.markAsUnreadButtonClicked()}>
            Mark As Unread
          </button>
      
          <select onChange={(event)=>props.applyLabel(event)} className="form-control label-select">
            <option disabled>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
      
          <select onChange={(event)=>props.removeLabel(event)} className="form-control label-select">
            <option disabled>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
      
          <button className="btn btn-default" onClick={props.deleteMessage}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
}

export default Toolbar; 