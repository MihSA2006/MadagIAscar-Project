import { useMemo } from 'react'
import { onboardingQuestions } from '../components/QuizSequence'

function readReview() {
  try {
    const rawAnswers = localStorage.getItem('madagiascar.onboarding.answers')
    const rawQuestions = localStorage.getItem('madagiascar.onboarding.questions')
    return {
      answers: rawAnswers ? JSON.parse(rawAnswers) : {},
      questions: rawQuestions ? JSON.parse(rawQuestions) : onboardingQuestions,
    }
  } catch {
    return { answers: {}, questions: onboardingQuestions }
  }
}

export default function OnboardingReviewPage({ navigate }) {
  const { answers, questions } = useMemo(() => readReview(), [])
  const answeredQuestions = questions.filter((question) => String(answers[question.id] || '').trim())

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-5 py-24 font-['DM_Sans',sans-serif] text-[#172018] md:px-12">
      <div className="absolute inset-[-120px] bg-[radial-gradient(ellipse_75%_65%_at_50%_25%,rgba(0,132,61,0.13),rgba(255,255,255,0.88)_48%,transparent_80%)]" />
      <div className="absolute right-10 top-20 h-36 w-36 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-12 left-10 h-40 w-40 rounded-full bg-[#00843D]/10 blur-3xl" />

      <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-6 md:px-12">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="font-['Space_Grotesk'] text-xl font-extrabold tracking-[-0.04em] text-[#172018]"
        >
          MadagIAscar<span className="text-red-500">°</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('onboarding')}
          className="rounded-full border border-[#00843D]/15 bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#1f3b22]/65 shadow-sm transition hover:border-[#00843D]/40"
        >
          Hanova
        </button>
      </nav>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl gap-8 md:grid-cols-[0.82fr_1.18fr] md:items-center">
        <section>
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#00843D]">Fanamarinana</p>
          <h1 className="mt-3 font-['Space_Grotesk'] text-5xl font-extrabold leading-[0.9] tracking-[-0.065em] md:text-7xl">
            Hamarino aloha ny valinteninao
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#213b26]/62 md:text-base">
            Ireto ny fanontaniana sy valiny nomenao. Raha marina dia ekeo, dia hanomboka ny famoronana dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <button
              type="button"
              onClick={() => navigate('dashboardCreation')}
              disabled={answeredQuestions.length === 0}
              className="rounded-full bg-[#00843D] px-8 py-4 text-xs font-black uppercase tracking-[2.4px] text-white shadow-[0_20px_50px_rgba(0,132,61,0.22)] transition hover:bg-[#172018] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Ekena, mamorona dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate('onboarding')}
              className="rounded-full border border-[#00843D]/15 bg-white px-8 py-4 text-xs font-black uppercase tracking-[2.4px] text-[#172018] transition hover:border-[#00843D]/40"
            >
              Hanova valiny
            </button>
          </div>
        </section>

        <section className="rounded-[38px] border border-[#00843D]/14 bg-white/88 p-4 shadow-[0_34px_120px_rgba(0,70,35,0.12)] backdrop-blur-xl md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4 px-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[2.6px] text-red-500">Lisitra</p>
              <h2 className="mt-1 font-['Space_Grotesk'] text-3xl font-extrabold tracking-[-0.055em]">Fanontaniana sy valiny</h2>
            </div>
            <span className="rounded-full bg-[#00843D]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#00843D]">
              {answeredQuestions.length} valiny
            </span>
          </div>

          <div className="max-h-[62vh] space-y-3 overflow-auto pr-1">
            {answeredQuestions.length > 0 ? answeredQuestions.map((question, index) => (
              <article key={question.id} className="rounded-[28px] bg-[#00843D]/5 p-4 md:p-5">
                <div className="mb-3 flex items-start gap-3">
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white text-xs font-black text-[#00843D] shadow-sm">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[2px] text-[#00843D]">
                      {question.aiGenerated ? 'Fanontaniana IA' : 'Fanontaniana'}
                    </p>
                    <h3 className="mt-1 text-base font-black leading-tight text-[#172018] md:text-lg">
                      {question.title}
                    </h3>
                  </div>
                </div>
                <p className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-[#213b26]/74 shadow-sm">
                  {answers[question.id]}
                </p>
              </article>
            )) : (
              <div className="rounded-[28px] bg-red-500/6 p-6 text-center">
                <p className="text-sm font-bold text-[#213b26]/65">Tsy mbola misy valiny. Miverena amin’ny fanontaniana.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
