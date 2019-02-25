import React from 'react';
import '../App.css';

// let addBody = {
//        <div class= { addBodyOfMessage() === true ? "row message-body" : "hidden"}>
//           <div class={true ? "col-xs-11 col-xs-offset-1" : 'hidden'}>
//             {props.addBodyOfMessage}
//           </div>
//         </div>
         
// }


let Message = (props) => {
    return (
      <div>
      <div className = {props.message.selected && props.message.read ? 'row message read selected': props.message.selected ? 'row message unread selected': props.message.read ? 'row message read' : 'row message unread'}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={props.message.selected ? true : false} onClick={() => props.messageSelect(props.message.id)}/>
          </div>
          <div className="col-xs-2">
            <i onClick={() => props.starTheMessage(props.message.id)} className= {`star fa fa-star${props.message.starred ? '' : '-o' }`}></i>
          </div>
        </div>
      </div>
      <div className='col-xs-11'>
      <span className={props.message.labels.includes('dev') ? "label label-warning" : "hidden"}>dev</span>
      <span className={props.message.labels.includes('gschool') ? "label label-warning" : "hidden"}>gschool</span>
      <span className={props.message.labels.includes('personal') ? "label label-warning" : "hidden"}>personal</span>
        <a href="#" onClick={()=> props.addBodyOfMessage(props.message.id)}>
          {props.message.subject} 
        </a>
      </div>
    </div>
      <div class= {props.bodyId === props.message.id ? "row message-body" : "hidden"}>
        <div class="col-xs-11 col-xs-offset-1">
          {props.message.body}
        </div>
      </div>
    </div>
    )
  }



export default Message