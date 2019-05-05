import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion.js'
import LeaderBoard from './LeaderBoard'
import LogOutPage from './LogOutPage'
import Nav from './Nav'
import QuestionDetail from './QuestionDetail';
import PageNotFound from './PageNotFound'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleUserData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav loggedIn={this.props.loggedIn}/>
            {this.props.loading === true
              ? null
              : <div>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <PrivRoute path='/new' component={NewQuestion} loggedIn={this.props.loggedIn} />
                  <PrivRoute path='/leaderboard' component={LeaderBoard} loggedIn={this.props.loggedIn} />
                  <PrivRoute path='/logout' component={LogOutPage} loggedIn={this.props.loggedIn} />
                  <PrivRoute path='/questions/:question_id' component={QuestionDetail} loggedIn={this.props.loggedIn}/>
                  <Route component='/error' component={PageNotFound} />
                  <Route component={PageNotFound} />
                </Switch>
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ users, authedUser, questions }) {
  return {
    loading: Object.values(users).length === 0,
    loggedIn: authedUser !== null,
    questions:questions
  }
}

const PrivRoute = ({ component: Component, ...rest, loggedIn }) => (
  <Route {...rest} render={(props) => (
    loggedIn === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
  )} />
)

export default connect(mapStateToProps)(App)