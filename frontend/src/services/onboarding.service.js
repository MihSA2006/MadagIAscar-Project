import { apiFetch } from './api'

export async function requestNextOnboardingQuestion(payload) {
  return apiFetch('/api/message', {
    method: 'POST',
    body: JSON.stringify({
      message: payload?.message || payload?.currentAnswer || '',
      currentQuestion: payload?.currentQuestion,
      currentAnswer: payload?.currentAnswer,
      answers: payload?.answers,
      questions: payload?.questions,
      questionIndex: payload?.questionIndex,
    }),
  })
}
