import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleLogin, handleQuestionData } from '../actions/shared'
import QuestionList from './QuestionList'
import { Redirect } from 'react-router-dom'

function UserData(props){
  let user = props.users.filter( function (data) {
    return data.id === props.authedUser
  });
  return <div>{"Hello "+user[0].name}</div>
}
const propStyle = {
    display:"none"
 };
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.selection = React.createRef();
    this.answered = React.createRef();
    this.unanswered = React.createRef();
    this.container = React.createRef();
  }
  state = {
    isSelectedData: false,
    redirectToReferrer: false
  }

  handleClick = (state) => {
    switch(state){
      case "answered" : 
         	this.unanswered.style.display = "none" 
    		  this.answered.style.display = "block" 
        	break
      case "unanswered" : 
        	this.unanswered.style.display = "block" 
    		  this.answered.style.display = "none" 
        	break
      default : 
        	break
    }
   
  }

  setSelectData = (con) => {
    this.setState({isSelectedData:con})
  }

  Login = (id) => {
    if(id !== "none"){
      this.props.dispatch(handleLogin(id))
      this.setState(() => ({
        redirectToReferrer: true
      }))
    }
  }
  

  hideContainer = () => {
    if(this.container.style.display === "none"){
      this.container.style.display = "block"
      this.setSelectData(false)
    }else{
      this.container.style.display = "none"
      this.setSelectData(true)
    }
  }

  
  componentDidMount(){
    this.props.dispatch(handleQuestionData())
  }
  render() {

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true && from.pathname !== '/') {
      return <Redirect to={from} />
    }

    return (
      <div>
        {this.props.loggedIn === false ? (
          <div className='center'>
            <h3>Would You Rather..?</h3>
            <h4>Please sign in to continue</h4>
            <select ref={(input)=> this.selection = input} defaultValue='none'>
              <option value='none' disabled>Select User</option>
              {this.props.users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <p></p>
            <button className='btn' onClick={() => {this.Login(this.selection.value)}}>Sign In</button>
          </div>
        ) :
        (
          <div>
            <div ref={(r)=> this.container = r}>
              <h3 className='center'><UserData users={this.props.users} authedUser={this.props.authedUser}></UserData></h3>
              <div className='center'>
                <div>
                  <button onClick={() => {this.handleClick("unanswered")}}>Unanswered Question</button>
                  <button onClick={() => {this.handleClick("answered")}}>Answered Question</button>
                </div>
                <div ref={(d)=> this.unanswered = d}>
                  <QuestionList typeQ="unanswered" hideContainer={this.hideContainer.bind(this)}></QuestionList>
                </div>
                <div style={propStyle} ref={(d)=> this.answered = d}>
                  <QuestionList typeQ="answered" hideContainer={this.hideContainer.bind(this)}></QuestionList>
                </div>
              </div>
              
              <ul className='dashboard-list'>
                
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser, selectquestion }) {
  return {
    users: Object.values(users),
    loggedIn: authedUser !== null,
    authedUser: authedUser,
    selectquestion:selectquestion
  }
}

export default connect(mapStateToProps)(Dashboard)