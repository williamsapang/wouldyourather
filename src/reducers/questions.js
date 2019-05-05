import { RECEIVE_QUESTIONS } from '../actions/questions'
import { SELECT_QUESTION } from '../actions/questions'

export function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    default :
      return state
  }
}

export function selectquestion (state = {}, action) {
  switch(action.type) {
    case SELECT_QUESTION :
      return action.question
    default :
      return state
  }
}