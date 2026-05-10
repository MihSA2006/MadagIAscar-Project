import QuizSequence from '../components/QuizSequence'

export default function OnboardingPage({ navigate }) {
  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif]">
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
          onClick={() => navigate('home')}
          className="rounded-full border border-[#00843D]/15 bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#1f3b22]/65 shadow-sm"
        >
          Hody
        </button>
      </nav>
      <QuizSequence onFinish={(answers) => {
        localStorage.setItem('madagiascar.onboarding.answers', JSON.stringify(answers?.answers || {}))
        localStorage.setItem('madagiascar.onboarding.questions', JSON.stringify(answers?.questions || []))
        if (answers?.dashboardConfig) {
          localStorage.setItem('madagiascar.dashboard.config', JSON.stringify(answers.dashboardConfig))
        }
        navigate('onboardingReview')
      }} />
    </div>
  )
}
