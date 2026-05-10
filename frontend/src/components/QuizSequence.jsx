import { useState } from 'react'
import { requestNextOnboardingQuestion } from '../services/onboarding.service'

export const onboardingQuestions = [
  {
    id: 'intro',
    title: 'Manaona! Inona no tianao hatsangana?',
    description: 'Soraty amin’ny teny tsotra ilay hevitra na karazana fandraharahana tianao atomboka.',
    placeholder: 'Ohatra: varotra sakafo, taxi moto, informaticien, fiompiana, agriculture...'
  }
]

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

function normalizeQuestion(rawQuestion, fallbackIndex) {
  if (!rawQuestion) return null

  if (typeof rawQuestion === 'string') {
    return {
      id: `backend_question_${fallbackIndex}_${Date.now()}`,
      aiGenerated: true,
      title: rawQuestion,
      description: 'Fanontaniana vaovao avy amin’ny backend IA.',
      placeholder: 'Soraty eto ny valinteninao...',
    }
  }

  return {
    id: rawQuestion.id || `backend_question_${fallbackIndex}_${Date.now()}`,
    aiGenerated: true,
    title: rawQuestion.title || rawQuestion.question || 'Fanontaniana manaraka',
    description: rawQuestion.description || rawQuestion.helpText || 'Fanontaniana noforonin’ny IA araka ny valinteninao.',
    placeholder: rawQuestion.placeholder || 'Soraty eto ny valinteninao...',
  }
}

function extractBackendQuestion(response) {
  if (!response) return null
  if (typeof response === 'string') return response

  return (
    response.nextQuestion ||
    response.question ||
    response.newQuestion ||
    response.message ||
    response.reply ||
    response.text ||
    response.output ||
    response.data?.nextQuestion ||
    response.data?.question ||
    response.data?.message ||
    null
  )
}

const formatMarkdown = (text) => {
  if (!text) return ''
  // Basic bold support **text**
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-black text-[#00843D]">{part}</strong> : part
  )
}

const loadingMessages = [
  "Eo am-pikarohana ny valiny...",
  "Miandry kely...",
  "Mandinika ny hevitrao ny IA...",
  "Andraso kely ny fanontaniana manaraka...",
  "Eo am-panamboarana ny dingana manaraka..."
]

export default function QuizSequence({ questions = onboardingQuestions, onFinish }) {
  const [questionList, setQuestionList] = useState(questions)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [requestedFor, setRequestedFor] = useState({})
  const [direction, setDirection] = useState(1)
  const [isLoadingNext, setIsLoadingNext] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0])
  const [error, setError] = useState('')
  const [dashboardConfig, setDashboardConfig] = useState(null)

  const current = questionList[index]
  const value = answers[current.id] || ''
  const canContinue = String(value).trim().length > 0 && !isLoadingNext
  const progress = questionList.length <= 1 ? 0.12 : index / Math.max(questionList.length - 1, 1)

  const update = (text) => {
    setAnswers((prev) => ({ ...prev, [current.id]: text }))
    setError('')
  }

  const finish = (finalAnswers = answers, finalQuestions = questionList, config = dashboardConfig) => {
    onFinish?.({
      answers: finalAnswers,
      questions: finalQuestions,
      dashboardConfig: config,
    })
  }

  const next = async () => {
    if (!canContinue) return

    const nextAnswers = { ...answers, [current.id]: value }
    const requestKey = `${current.id}:${String(value).trim()}`
    const alreadyRequested = requestedFor[current.id] === requestKey

    if (alreadyRequested && index < questionList.length - 1) {
      setDirection(1)
      setIndex((i) => i + 1)
      return
    }

    if (alreadyRequested && index >= questionList.length - 1) {
      finish(nextAnswers)
      return
    }

    setIsLoadingNext(true)
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
    setError('')

    try {
      const response = await requestNextOnboardingQuestion({
        message: String(value).trim(),
        currentQuestion: current,
        currentAnswer: String(value).trim(),
        answers: nextAnswers,
        questions: questionList,
        questionIndex: index,
      })

      const config = response?.dashboardConfig || response?.dashboard || response?.data?.dashboardConfig || response?.data || null
      if (config) setDashboardConfig(config)

      const isLastQuestion = index >= 7 // 8th question is the last (index 7)
      const shouldFinish = isLastQuestion || response?.termine === true || response?.done === true || response?.complete === true

      const backendQuestion = normalizeQuestion(extractBackendQuestion(response), index + 1)

      setRequestedFor((prev) => ({ ...prev, [current.id]: requestKey }))

      if (shouldFinish || !backendQuestion) {
        // If we reached the limit but backend didn't finish, we still finish the UI flow
        finish(nextAnswers, questionList, config || dashboardConfig)
        return
      }

      setQuestionList((prev) => {
        const nextList = [
          ...prev.slice(0, index + 1),
          backendQuestion,
        ]
        setDirection(1)
        setIndex(index + 1)
        return nextList
      })
    } catch (err) {
      setError(err?.message || 'Tsy afaka nahazo fanontaniana vaovao avy amin’ny backend.')
    } finally {
      setIsLoadingNext(false)
    }
  }

  const back = () => {
    setError('')
    setDirection(-1)
    setIndex((i) => clamp(i - 1, 0, questionList.length - 1))
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-4 py-20 text-[#172018] md:px-10">
      <div className="absolute inset-[-120px] bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,rgba(0,132,61,0.13),rgba(255,255,255,0.86)_45%,transparent_78%)]" />
      <div className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00843D]/10" />
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00843D]/8" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] max-w-7xl flex-col justify-center">
        <div className="mb-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#00843D]">Fanontaniana mitohy</p>
          <h1 className="mt-2 font-['Space_Grotesk'] text-5xl font-extrabold leading-[0.9] tracking-[-0.065em] md:text-7xl">
            Andao hanomboka
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#213b26]/58">
            Ny fanontaniana voalohany ihany no raikitra. Aorian’izay ny backend IA no mamorona ny fanontaniana manaraka.
          </p>
        </div>

        <div className="relative mx-auto h-[620px] w-full max-w-5xl md:h-[650px]">
          <div className="absolute left-1/2 top-[50%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00843D]/15 md:h-[690px] md:w-[690px]" />
          <div className="absolute left-1/2 top-[50%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00843D]/10 bg-white/45 shadow-[0_50px_140px_rgba(0,70,35,0.10)] backdrop-blur-xl md:h-[540px] md:w-[540px]" />
          <div className="absolute left-1/2 top-[50%] h-[2px] w-[74%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00843D]/20 to-transparent" />

          <div className="absolute left-1/2 top-[50%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 md:h-[690px] md:w-[690px]">
            {questionList.slice(0, index).map((question, i) => {
              const angle = -90 + (Math.max(index, 1) === 1 ? 90 : (180 / Math.max(index, 1)) * i)
              return (
                <div
                  key={`answered-${question.id}`}
                  className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-[#00843D]/35 transition-all duration-700"
                  style={{ transform: `rotate(${angle}deg) translateY(-255px) translate(-50%, -50%)` }}
                  title={question.title}
                />
              )
            })}
          </div>

          <div className="absolute left-1/2 top-[50%] z-30 -translate-x-1/2 -translate-y-1/2">
            <div
              key={current.id}
              className="w-[min(88vw,560px)] animate-[fadeIn_.42s_ease-out] rounded-[36px] border border-[#00843D]/20 bg-white/92 p-7 text-center shadow-[0_32px_100px_rgba(0,70,35,0.14)] backdrop-blur-xl md:p-9"
              style={{ animation: 'fadeIn .42s ease-out both' }}
            >
              <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-[#00843D]/8 px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#00843D]">
                {current.aiGenerated && <span className="rounded-full bg-[#00843D] px-2 py-0.5 text-white">IA</span>}
                Fanontaniana {index + 1}/{questionList.length}
              </div>

              {isLoadingNext ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#00843D]/20 border-t-[#00843D]" />
                  <p className="mt-6 text-sm md:text-base font-bold text-[#00843D] animate-pulse">
                    {loadingMessage}
                  </p>
                  <p className="mt-2 text-xs text-[#213b26]/50">
                    Azafady miandrasa kely, mamorona fanontaniana ny IA...
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-['Space_Grotesk'] text-2xl font-extrabold leading-[1.1] tracking-[-0.04em] md:text-3xl">
                    {formatMarkdown(current.title)}
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-[#213b26]/70 md:text-sm">
                    {formatMarkdown(current.description)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="absolute left-1/2 top-[50%] z-40 w-[min(92vw,720px)] -translate-x-1/2 translate-y-[170px] md:translate-y-[205px]">
            <div key={`input-${current.id}`} className="animate-[fadeIn_.42s_ease-out] text-center">
              <textarea
                value={value}
                onChange={(e) => update(e.target.value)}
                placeholder={current.placeholder}
                rows={3}
                className="mx-auto block w-full max-w-2xl rounded-[34px] border border-[#00843D]/15 bg-white/92 p-6 text-sm font-semibold text-[#172018] outline-none shadow-[0_28px_90px_rgba(0,70,35,0.12)] placeholder:text-[#1f3b22]/25 focus:border-[#00843D]/45 focus:shadow-[0_0_0_5px_rgba(0,132,61,0.08)]"
              />

              {error && (
                <div className="mx-auto mt-4 max-w-2xl rounded-3xl border border-red-500/20 bg-red-50 px-5 py-3 text-sm font-bold text-red-600">
                  {error}
                </div>
              )}

              <div className="mt-7 flex justify-center gap-3">
                <button
                  type="button"
                  disabled={index === 0 || isLoadingNext}
                  onClick={back}
                  className="rounded-full border border-[#00843D]/15 bg-white px-6 py-4 text-xs font-black uppercase tracking-[2px] text-[#172018] shadow-sm transition hover:border-[#00843D]/40 disabled:opacity-30"
                >
                  Miverina
                </button>
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={next}
                  className="rounded-full bg-[#00843D] px-8 py-4 text-xs font-black uppercase tracking-[2px] text-white shadow-[0_18px_38px_rgba(0,132,61,0.22)] transition hover:bg-[#172018] disabled:opacity-35"
                >
                  {isLoadingNext ? (
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {loadingMessage}
                    </div>
                  ) : 'Manaraka'}
                </button>
              </div>

              <div className="mx-auto mt-6 h-1.5 max-w-xs overflow-hidden rounded-full bg-[#00843D]/10">
                <div
                  className="h-full rounded-full bg-[#00843D] transition-all duration-700"
                  style={{ width: `${Math.max(8, progress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
