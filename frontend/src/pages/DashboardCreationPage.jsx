import { useEffect, useMemo, useState } from 'react'

const steps = [
  'Mamaky ny valinteninao',
  'Mamaritra ny karazana fandraharahana',
  'Mamorona drafitra voalohany',
  'Manomana tabilao fanaraha-maso',
  'Mampiditra tanjona sy asa tokony hatao'
]

function readBusinessName() {
  try {
    const raw = localStorage.getItem('madagiascar.onboarding.answers')
    const answers = raw ? JSON.parse(raw) : {}
    return answers.business_type || answers.ai_reason || 'fandraharahanao'
  } catch {
    return 'fandraharahanao'
  }
}

export default function DashboardCreationPage({ navigate }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const businessName = useMemo(() => readBusinessName(), [])

  useEffect(() => {
    const timers = []
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setProgress(i + 1), 650 + i * 850))
    })
    timers.push(setTimeout(() => setDone(true), 650 + steps.length * 850 + 600))
    return () => timers.forEach(clearTimeout)
  }, [])

  const percent = Math.round((progress / steps.length) * 100)

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-5 py-24 font-['DM_Sans',sans-serif] text-[#172018]">
      <div className="absolute inset-[-120px] bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,rgba(0,132,61,0.14),rgba(255,255,255,0.88)_48%,transparent_80%)]" />
      <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00843D]/10" />
      <div className="absolute right-10 top-24 h-32 w-32 rounded-full bg-red-500/10 blur-3xl" />

      <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-6 md:px-12">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="font-['Space_Grotesk'] text-xl font-extrabold tracking-[-0.04em] text-[#172018]"
        >
          MadagIAscar<span className="text-red-500">°</span>
        </button>
        <span className="rounded-full border border-[#00843D]/15 bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#1f3b22]/65 shadow-sm">
          Miasa ao ambadika
        </span>
      </nav>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center text-center">
        <p className="text-[10px] font-black uppercase tracking-[3px] text-[#00843D]">Dingana manaraka</p>
        <h1 className="mt-3 max-w-4xl font-['Space_Grotesk'] text-5xl font-extrabold leading-[0.9] tracking-[-0.065em] md:text-7xl">
          Mamorona ny dashboard ho an’ny {businessName}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#213b26]/60 md:text-base">
          Avelao hiasa kely ny IA. Mamorona tabilao, asa voalohany, tanjona, ary fanaraha-maso vola ho an’ny fandraharahanao izy.
        </p>

        <section className="relative mt-10 w-full max-w-2xl rounded-[38px] border border-[#00843D]/15 bg-white/88 p-5 shadow-[0_32px_100px_rgba(0,70,35,0.13)] backdrop-blur-xl md:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-[2.4px] text-red-500">Fanamboarana dashboard</p>
              <p className="mt-1 text-sm font-bold text-[#213b26]/70">
                {done ? 'Vita ny fanomanana' : 'Mbola mandeha ao ambadika...'}
              </p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#00843D] font-['Space_Grotesk'] text-lg font-extrabold text-white shadow-[0_18px_38px_rgba(0,132,61,0.22)]">
              {percent}%
            </div>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-[#00843D]/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00843D] to-red-500 transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="mt-6 space-y-3 text-left">
            {steps.map((step, i) => {
              const active = i < progress
              return (
                <div key={step} className="flex items-center gap-3 rounded-2xl bg-[#00843D]/5 px-4 py-3">
                  <span className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-black ${active ? 'bg-[#00843D] text-white' : 'bg-white text-[#00843D]/45'}`}>
                    {active ? '✓' : i + 1}
                  </span>
                  <span className={`text-sm font-semibold ${active ? 'text-[#172018]' : 'text-[#213b26]/40'}`}>{step}</span>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            disabled={!done}
            onClick={() => navigate('dashboard')}
            className="mt-7 w-full rounded-full bg-[#172018] py-4 text-xs font-black uppercase tracking-[2.4px] text-white transition hover:bg-[#00843D] disabled:cursor-not-allowed disabled:opacity-35"
          >
            {done ? 'Hijery ny dashboard' : 'Andraso kely...'}
          </button>
        </section>
      </main>
    </div>
  )
}
