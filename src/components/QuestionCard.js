import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSelectQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'
class QuestionCard extends Component {
    state = {
        openQuestion: false,
        question_id: ""
    }
    openQuestionDetails =(question_id) => {
        this.setState({openQuestion:true, question_id:question_id})
    }
    render(){
        if (this.state.openQuestion === true) {
            return <Redirect to={'/questions/'+this.state.question_id} />
        }
        return(
            <div>
                <div>{this.props.author+" asks:"}</div>
                <div>{".."+this.props.question+".."}</div>
                <button onClick={() => {this.openQuestionDetails(this.props.qid)}}>View Poll</button>
                    <p></p>
            </div>
        )
    }
}

export default connect()(QuestionCard)