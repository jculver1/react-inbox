import React from 'react';
import '../App.css';


const Compose = (props) => {
    return (
        <form class="form-horizontal well">
        <div class="form-group">
            <div class="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
            </div>
        </div>
        <div class="form-group">
            <label for="subject" class="col-sm-2 control-label">Subject</label>
            <div class="col-sm-8">
            <input onChange = {(event) =>props.subjectOfEmail(event)}type="text" class="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
             </div>
        </div>
        <div class="form-group">
            <label for="body" class="col-sm-2 control-label">Body</label>
            <div class="col-sm-8">
            <textarea onChange ={(event) => props.bodyofEmail(event)} name="body" id="body" class="form-control"></textarea>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-8 col-sm-offset-2">
            <input onSubmit= {()=>props.submitForm()} type="submit" value="Send" class="btn btn-primary"></input>
            </div>
        </div>
        </form>
)
}

export default Compose 