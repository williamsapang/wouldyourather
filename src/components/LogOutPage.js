import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/shared'

class LogOutPage extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this)
    }
    logOut = () => {
        this.props.dispatch(handleLogin(null))
    }
    checkLogin = () => {
        if(this.props.loggedIn === false){
            this.props.history.push('/')
        }
    }
    componentDidMount(){
        this.checkLogin()
    }
    componentDidUpdate(){
        this.checkLogin()
    }
    render(){
        return(
            <div>
                <h4 className='center'>REALLY?</h4>
                <div className='center'>
                    <button className='button btn' onClick={this.logOut}> Logout </button>
                </div>
            </div>
        )
    }
}
  
function mapStateToProps ({ authedUser }) {
    return {
        loggedIn: authedUser !== null
    }
}

  
export default connect(mapStateToProps)(LogOutPage)