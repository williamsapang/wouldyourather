import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestion,handleUserData,handleQuestionData } from '../actions/shared';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }
  handleChangeOne = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
        optionOne
    }))
  }
  handleChangeTwo = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
        optionTwo
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
   
    this.props.dispatch(handleSaveQuestion(this.props.authedUser,optionOne,optionTwo))
    this.props.dispatch(handleUserData())
    this.props.dispatch(handleQuestionData())

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome === true || this.props.loggedIn === false) {
      return <Redirect to='/' />
    }

    return (
      <div className='center'>
        <h3>Create New Question</h3>
        <p>Complete The Question:</p>
        <p></p>
        <h4>Would you rather...</h4>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
            <input className='text' value={optionOne} onChange={this.handleChangeOne} maxLength={50} type="text" placeholder="Enter Option One Text Here"/>
            <input className='text' value={optionTwo} onChange={this.handleChangeTwo} maxLength={50} type="text" placeholder="Enter Option Two Text Here"/>
    
          <button
            className='btn'
            type='submit'
            disabled={optionOne === ''|| optionTwo === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
    return {
      authedUser: authedUser,
      loggedIn: authedUser !== null,
    }
  }
export default connect(mapStateToProps)(NewQuestion)