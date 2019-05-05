export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SELECT_QUESTION = 'SELECT_QUESTION'
export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function selectQuestion (question) {
  return {
    type: SELECT_QUESTION,
    question,
  }
}