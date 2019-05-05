import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNameById, checkOption } from '../utils2/api'
import { handleSaveQuestionAnswer, handleUserData, handleQuestionData } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class QuestionDetail extends Component {
    state = {
        toHome: false
    }
    constructor(props) {
        super(props);
        this.btnvote1 = React.createRef();
        this.btnvote2 = React.createRef();
    }
    getQuestionDetail = (id) => {
        let questlist = Object.values(this.props.questions)
        for(let i=0; i<questlist.length; i++){
            if(questlist[i].id === id){
                return questlist[i]
            }
        }
    }
    saveQuestionAnswer = (options) =>{
        this.btnvote1.style.display = "none"
        this.btnvote2.style.display = "none"
        this.props.dispatch(handleSaveQuestionAnswer(this.props.authedUser,this.props.match.params.question_id,options))
        this.props.dispatch(handleUserData())
        this.props.dispatch(handleQuestionData())
    }
    backToHome = () => {
        this.setState({toHome:true})
    }
    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/' />
        }
        let options = checkOption(this.props.users,this.props.authedUser,this.props.match.params.question_id)
        let det = this.getQuestionDetail(this.props.match.params.question_id)
        if(det === undefined){
            return <Redirect to='/error' />
        }
        let voteFirst = det.optionOne.votes.length
        let voteSecond = det.optionTwo.votes.length
        let totalVotes = voteFirst+voteSecond
        let percentFirst = (voteFirst/(totalVotes))*100
        let percentsecond = (voteSecond/(totalVotes))*100
        
        return(
            <div className='center'>
            {options==="" ? (
                <div>
                    <h3>{getNameById(this.props.users,det.author) + " Asks : "}</h3>
                        <h4>Would You Rather...</h4>
                        <span>{det.optionOne.text+" "}</span>
                        <button ref={(b1)=> this.btnvote1 = b1} onClick={() => {this.saveQuestionAnswer("optionOne")}}>Vote</button>
                        <p></p>
                        <span>{det.optionTwo.text+" "}</span>
                        <button ref={(b2)=> this.btnvote2 = b2} onClick={() => {this.saveQuestionAnswer("optionTwo")}}>Vote</button>
                </div>
            ) : (
                <div>
                    <h3>{"Asked By "+getNameById(this.props.users,det.author)}</h3>
                    <h4>Results:</h4>
                    <span>{"Would you rather "+det.optionOne.text+" ? "}</span>
                    {options === "optionOne" ? <span>(Your vote)</span>: null}
                    <div>{voteFirst+" out of "+totalVotes+" votes ("+percentFirst+"%)"}</div>
                    <p></p>
                    <span>{"Would you rather "+det.optionTwo.text+" ? "}</span>
                    {options === "optionTwo" ? <span>(Your vote)</span>: null}
                    <div>{voteSecond+" out of "+totalVotes+" votes ("+percentsecond+"%)"}</div>
                </div>
            )}
            <p></p>
            <button onClick={this.backToHome}>Back</button>
            </div>
        )
    }
}

function mapStateToProps ({ questions, users, selectquestion, authedUser }) {
  return {
    questions:questions,
    selectquestion:selectquestion,
    users:users,
    authedUser:authedUser,
    loggedIn: authedUser !== null,
  }
}

export default connect(mapStateToProps)(QuestionDetail)