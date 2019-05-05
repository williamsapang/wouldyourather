import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionData } from '../actions/shared'
import QuestionCard from './QuestionCard'
import { getNameById } from '../utils2/api'

class QuestionList extends Component {
    componentDidMount(){
        this.props.dispatch(handleQuestionData())
    }
    checkAnsweredBy(questionid,userid){
        var check = false
        let q = Object.values(this.props.questions)
        for(let i=0; i<q.length; i++){
            if(q[i].id === questionid){
                let votesFirst = q[i].optionOne.votes
                let votesSecond = q[i].optionTwo.votes
                for(let j=0; j<votesFirst.length; j++){
                    if(votesFirst[j]===userid){
                        check = true
                    }
                }
                for(let j=0; j<votesSecond.length; j++){
                    if(votesSecond[j]===userid){
                        check = true
                    }
                }
            }
        }
        return check
    }
    render(){
        return(
            <div>
                {this.props.typeQ === "answered" ? (
                    <Answered 
                        hideContainer={this.props.hideContainer}
                        q={this.props.questions} 
                        users={this.props.users} 
                        authedUser={this.props.authedUser}
                        checkAnsweredBy={this.checkAnsweredBy.bind(this)}></Answered>
                ) : (
                    <Unanswered 
                        hideContainer={this.props.hideContainer}
                        q={this.props.questions} 
                        users={this.props.users} 
                        authedUser={this.props.authedUser}
                        checkAnsweredBy={this.checkAnsweredBy.bind(this)}></Unanswered>
                )}
            </div>
        )
    }
}

function Answered(props){
    return (
        <div><h4>Answered Question</h4>
            {Object.values(props.q)
            .sort((a,b) => b.timestamp - a.timestamp)
            .map(qu => {
                return props.checkAnsweredBy(qu.id,props.authedUser) === true ?
                <QuestionCard
                    hideContainer={props.hideContainer}
                    key={qu.id}
                    qid={qu.id}
                    typeC="answered"
                    author={getNameById(props.users,qu.author)}
                    question={qu.optionOne.text}></QuestionCard> :
                null
              })}
        </div>)
}
function Unanswered(props){
    return (
        <div><h4>Unanswered Question</h4>
            {Object.values(props.q)
            .sort((a,b) => b.timestamp - a.timestamp)
            .map(qu => {
                return props.checkAnsweredBy(qu.id,props.authedUser) === false ?
                <QuestionCard
                    hideContainer={props.hideContainer}
                    key={qu.id}
                    qid={qu.id}
                    typeC="unanswered"
                    author={getNameById(props.users,qu.author)}
                    question={qu.optionOne.text}></QuestionCard> :
                null
              })}
        </div>)
}


function mapStateToProps ({ users, questions, authedUser }) {
    return {
        questions:questions,
        users:users,
        authedUser:authedUser
    }
}

export default connect(mapStateToProps)(QuestionList)