import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion
} from './_DATA.js'

export function getUserData () {
  return Promise.all([
    _getUsers()
  ]).then(([users]) => ({
    users
  }))
}

export function getQuestionData () {
  return Promise.all([
    _getQuestions()
  ]).then(([questions]) => ({
    questions
  }))
}

export function saveQuestionAnswer ( authedUser, qid, answer ) {
  return Promise.all([
    _saveQuestionAnswer( authedUser, qid, answer )
  ]).then(([users,questions]) => ({
    users,
    questions
  }))
}

export function saveQuestion ( question ) {
  return _saveQuestion(question)
}

export function getNameById(users,id){
  for(let i=0; i<Object.values(users).length; i++){
      if(Object.values(users)[i].id === id){
          return Object.values(users)[i].name
      }
  }
  return ""
}


export function checkOption(users, userid, questionid){
  let _users = Object.values(users)
  let user = null
  for(let i=0; i<_users.length; i++){
    if(_users[i].id === userid){
      user = _users[i]
    }
  }
  let answers = user.answers
  let qids = Object.keys(answers)
  let option = ""
  for(let i=0; i<qids.length; i++){
    if(qids[i] === questionid){
      option = Object.values(answers)[i]
    }
  }
  return option
}