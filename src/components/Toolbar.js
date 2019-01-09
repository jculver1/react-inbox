import React from 'react';
import '../App.css';


const Toolbar =(props) => {
    return (
        <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>
      
          <button className="btn btn-default" onClick={()=> props.selectAll()}> 
            <i className={props.messages.every(message => message.selected === true) ? 'fa fa-check-square-o' 
            : props.messages.every( message => message.selected === false) ? 'fa fa-minus-square-o' 
            : 'fa fa-square-o'}></i>
          </button>
      
          <button className="btn btn-default" onClick={()=> props.markAsReadButtonClicked()}>
            Mark As Read
          </button>
      
          <button className="btn btn-default" onClick={()=> props.markAsUnreadButtonClicked()}>
            Mark As Unread
          </button>
      
          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
      
          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
      
          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
}

export default Toolbar; 