import { useState } from 'react'
import { registerRequest } from '../services/auth.service'

export default function ModernRegisterFlow({ onDone }) {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState('')
  const canNextEmail = /\S+@\S+\.\S+/.test(email)
  const canNextPassword = password.length >= 6 && !isRegistering

  const handleRegister = async () => {
    if (!canNextPassword) return
    setIsRegistering(true)
    setError('')

    try {
      const session = await registerRequest({
        email,
        password,
        remember: true,
      })
      onDone?.(session)
    } catch (err) {
      setError(err?.message || 'Tsy tafiditra ny fisoratana anarana. Andramo indray.')
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <div className="relative w-full max-w-[430px] scale-[0.88] sm:scale-100 origin-bottom md:origin-center">
      <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-red-500/10 blur-2xl" />
      <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-[#00843D]/10 blur-2xl" />

      <div className="relative rounded-[28px] border border-[#00843D]/15 bg-white p-2 shadow-[0_30px_100px_rgba(0,70,35,0.14)] md:rounded-[34px] md:p-3">
        <div className="rounded-[22px] bg-white p-4 md:rounded-[26px] md:p-6">
          <div className="mb-3 flex items-center justify-between gap-3 md:mb-5 md:gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[2.8px] text-red-500">Manomboka eto</p>
              <h3 className="mt-1 font-['Space_Grotesk'] text-2xl font-extrabold leading-none tracking-[-0.05em] text-[#172018] md:text-3xl">
                Kaonty fandraharahana
              </h3>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#00843D] text-base font-black text-white shadow-[0_16px_34px_rgba(0,132,61,0.28)] md:h-12 md:w-12 md:text-lg">
              {step === 'email' ? '1' : '2'}
            </div>
          </div>

          <div className="mb-3 flex gap-2 md:mb-5">
            <span className={`h-1.5 flex-1 rounded-full transition-all ${step === 'email' ? 'bg-red-500' : 'bg-[#00843D]'}`} />
            <span className={`h-1.5 flex-1 rounded-full transition-all ${step === 'password' ? 'bg-red-500' : 'bg-[#00843D]/18'}`} />
          </div>

          {step === 'email' ? (
            <div className="animate-[fadeIn_.35s_ease-out]">
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-[#1f3b22]/45">Mail</label>
              <div className="mt-2 flex items-center gap-3 rounded-full border border-[#00843D]/15 bg-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus-within:border-[#00843D]/40 focus-within:shadow-[0_0_0_4px_rgba(0,132,61,0.08)] md:mt-3 md:px-5 md:py-3.5">
                <span className="text-lg">✉️</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="anaranao@mail.com"
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#172018] outline-none placeholder:text-[#1f3b22]/25"
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#213b26]/58 md:mt-3 md:text-xs">
                Ampidiro aloha ny mailaka. Hitahiry ny drafitra, vola miditra ary torohevitra IA ho an'ny tetikasanao izy io.
              </p>
              <button
                type="button"
                disabled={!canNextEmail}
                onClick={() => {
                  setError('')
                  setStep('password')
                }}
                className="mt-3 w-full rounded-full bg-[#172018] py-3.5 text-xs font-black uppercase tracking-[2.4px] text-white transition-all hover:bg-[#00843D] disabled:cursor-not-allowed disabled:opacity-35 md:mt-5 md:py-4"
              >
                Manaraka
              </button>
            </div>
          ) : (
            <div className="animate-[fadeIn_.35s_ease-out]">
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-[#1f3b22]/45">Teny miafina</label>
              <div className="mt-2 flex items-center gap-3 rounded-full border border-red-500/15 bg-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus-within:border-red-500/40 focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.08)] md:mt-3 md:px-5 md:py-3.5">
                <span className="text-lg">🔐</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Mamorona teny miafina"
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#172018] outline-none placeholder:text-[#1f3b22]/25"
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#213b26]/58 md:mt-3 md:text-xs">
                Ataovy fohy nefa matanjaka. Rehefa vita dia hanomboka hamantatra ny karazana fandraharahanao isika.
              </p>
              {error && (
                <div className="mt-3 rounded-xl bg-red-50 p-3 border border-red-100 animate-[fadeIn_.3s_ease-out]">
                  <p className="text-[10px] font-bold text-red-600 leading-tight">
                    ⚠️ {error}
                  </p>
                </div>
              )}

              <div className="mt-3 grid grid-cols-[0.8fr_1fr] gap-3 md:mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setError('')
                    setStep('email')
                  }}
                  className="rounded-full border border-[#00843D]/15 bg-white py-3.5 text-xs font-black uppercase tracking-[2px] text-[#172018] transition hover:border-[#00843D]/40 md:py-4"
                >
                  Miverina
                </button>
                <button
                  type="button"
                  disabled={!canNextPassword || isRegistering}
                  onClick={handleRegister}
                  className="rounded-full bg-red-500 py-3.5 text-xs font-black uppercase tracking-[2px] text-white shadow-[0_18px_38px_rgba(239,68,68,0.24)] transition hover:bg-[#00843D] disabled:cursor-not-allowed disabled:opacity-35 md:py-4"
                >
                  {isRegistering ? 'Andrasana...' : 'Hamorona'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
