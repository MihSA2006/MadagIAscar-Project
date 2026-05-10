import { useMemo } from 'react'

function readAnswers() {
  try {
    const raw = localStorage.getItem('madagiascar.onboarding.answers')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function valueOrFallback(value, fallback) {
  const text = String(value || '').trim()
  return text || fallback
}

export default function DashboardPage({ navigate }) {
  const answers = useMemo(() => readAnswers(), [])
  const business = valueOrFallback(answers.business_type, 'tetikasanao')
  const city = valueOrFallback(answers.city, 'Madagasikara')
  const budget = valueOrFallback(answers.budget, 'teti-bola voalohany')
  const goal = valueOrFallback(answers.goal, 'hahazo mpanjifa voalohany')

  const actions = [
    'Farito tsara ny vokatra na tolotra amidy voalohany',
    'Mitadiava mpanjifa 10 mety liana ao amin’ny faritra',
    'Soraty ny fandaniana fototra sy ny vidiny hivarotana',
    'Manaova hafatra fohy hampahafantarana ny tolotra',
  ]

  const metrics = [
    ['Teti-bola', budget],
    ['Toerana', city],
    ['Tanjona', goal],
  ]

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8fbf8] font-['DM_Sans',sans-serif] text-[#172018]">
      <div className="fixed inset-[-120px] bg-[radial-gradient(ellipse_80%_65%_at_70%_20%,rgba(0,132,61,0.13),transparent_55%),radial-gradient(ellipse_65%_55%_at_20%_80%,rgba(239,68,68,0.10),transparent_55%)]" />

      <nav className="relative z-10 flex items-center justify-between px-5 py-6 md:px-12">
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
          className="rounded-full border border-[#00843D]/15 bg-white/80 px-5 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#1f3b22]/65 shadow-sm backdrop-blur-xl transition hover:border-[#00843D]/40"
        >
          Hanova valiny
        </button>
      </nav>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl gap-6 px-5 pb-8 md:grid-cols-[1.05fr_.95fr] md:px-12">
        <section className="flex flex-col justify-center py-8">
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#00843D]">Dashboard IA</p>
          <h1 className="mt-3 max-w-4xl font-['Space_Grotesk'] text-5xl font-extrabold leading-[0.88] tracking-[-0.07em] md:text-7xl">
            Drafitra voalohany ho an’ny {business}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#213b26]/65 md:text-base">
            Ity no santionan’ny dashboard vokarin’ny IA: tanjona, asa atao, fanaraha-maso vola ary soso-kevitra mifanaraka amin’ny valinteninao.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {metrics.map(([label, value]) => (
              <div key={label} className="rounded-[26px] border border-[#00843D]/12 bg-white/78 p-5 shadow-[0_22px_70px_rgba(0,70,35,0.08)] backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[2.4px] text-red-500">{label}</p>
                <p className="mt-2 line-clamp-3 text-sm font-bold leading-snug text-[#172018]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col justify-center gap-4 py-8">
          <div className="rounded-[38px] border border-[#00843D]/14 bg-white/84 p-5 shadow-[0_34px_120px_rgba(0,70,35,0.12)] backdrop-blur-2xl md:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[2.6px] text-[#00843D]">Asa anio</p>
                <h2 className="mt-1 font-['Space_Grotesk'] text-3xl font-extrabold tracking-[-0.055em]">Lalana mazava</h2>
              </div>
              <span className="rounded-full bg-[#00843D] px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-white">4 asa</span>
            </div>

            <div className="space-y-3">
              {actions.map((action, i) => (
                <div key={action} className="flex items-start gap-3 rounded-3xl bg-[#00843D]/5 p-4">
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white text-xs font-black text-[#00843D] shadow-sm">{i + 1}</span>
                  <p className="pt-1 text-sm font-semibold leading-relaxed text-[#213b26]/72">{action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[32px] bg-[#172018] p-6 text-white shadow-[0_28px_90px_rgba(23,32,24,0.20)]">
              <p className="text-[10px] font-black uppercase tracking-[2.6px] text-green-300">Soso-kevitra IA</p>
              <p className="mt-4 text-sm leading-relaxed text-white/72">
                Atombohy amin’ny tolotra kely mora hazavaina, avy eo refeso ny valin’ny mpanjifa alohan’ny hampitomboana ny fandaniana.
              </p>
            </div>
            <div className="rounded-[32px] border border-red-500/12 bg-white/84 p-6 shadow-[0_24px_80px_rgba(239,68,68,0.08)] backdrop-blur-xl">
              <p className="text-[10px] font-black uppercase tracking-[2.6px] text-red-500">Fanaraha-maso vola</p>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-red-500/10">
                <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-red-500 to-[#00843D]" />
              </div>
              <p className="mt-3 text-xs font-bold text-[#213b26]/58">42% amin’ny fanomanana voalohany</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
