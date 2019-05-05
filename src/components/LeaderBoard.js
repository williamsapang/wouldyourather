import React, { Component, StyleSheet} from 'react'
import { connect } from 'react-redux'
class LeaderBoard extends Component {
    render(){
        return(
            <div className='center'>
            {this.props.users.sort((a,b) =>
                (Object.values(b.answers).length+b.questions.length) - (Object.values(a.answers).length+a.questions.length)
            )
            .map((user) => 
               <div key={user.id}>
                    <img src={user.avatarURL} style={photoStyle}/>
                    <div>{user.name}</div>
                    <div>{"Answered questions : "+Object.values(user.answers).length}</div>
                    <div>{"Created questions : "+user.questions.length}</div>
                    <div>{"Scores : "+(Object.values(user.answers).length+user.questions.length)}</div>
                    <p></p>
               </div> 
                )}
            </div>
        )
    }
}

function mapStateToProps ({users, authedUser}) {
    return {
      users: Object.values(users),
      loggedIn: authedUser !== null,
    }
  }

  const photoStyle = {
    height: '50px',
    width: '50px'
}

export default connect(mapStateToProps)(LeaderBoard)