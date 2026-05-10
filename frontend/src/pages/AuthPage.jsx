// pages/AuthPage.jsx
import { useState, useEffect } from 'react'
import { useLoginForm, useRegisterForm } from '../hooks/useAuthForm'
import { loginRequest, registerRequest } from '../services/auth.service'
import { AuthField } from '../components/AuthField'
import { getStrength } from '../utils/passwordStrength'
import { getAuthUser } from '../services/api'
import { Home } from 'lucide-react'

// ── Brand copy swaps between login / register ──
const BRAND = {
  login: {
    eyebrow: 'Tongasoa indray',
    headline: <>Midira mora.<br /><em className="not-italic text-green-400">Ampiasao haingana.</em></>,
    desc: "Midira hijery ireo fiasa, hitantana ny kaonty, ary hanohy ny fitetezana ao amin'ny sehatra.",
  },
  register: {
    eyebrow: 'Vaovao eto',
    headline: <>Mamorona<br /><em className="not-italic text-green-400">kaonty.</em></>,
    desc: 'Mamorona kaonty mba hahafahana mampiasa ireo fiasa rehetra rehefa vonona ny atiny.',
  },
}

const STATS = [['Fiasa', 'Maro'], ['Haingana', 'Fidirana'], ['Mazava', 'Endrika']]

export default function AuthPage({ navigate }) {
  const [view, setView] = useState('login')   // 'login' | 'register'
  const brand = BRAND[view]

  useEffect(() => {
    if (getAuthUser()) {
      navigate('home')
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#121622] text-white font-['DM_Sans',sans-serif] grid md:grid-cols-2 relative">

      {/* ── Nav ── */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 py-6 z-20">
        <div className="font-['Space_Grotesk'] font-extrabold text-xl flex items-center gap-0.5">
          mada<span className="text-green-400 text-2xl leading-none">°</span>
        </div>
        <div className="flex gap-1 bg-white/5 border border-white/8 rounded-full p-1">
          {['login', 'register'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-5 py-1.5 rounded-full text-[0.62rem] font-medium uppercase tracking-widest transition-all ${view === v ? 'bg-white text-[#121622]' : 'text-white/40 hover:text-white'
                }`}>
              {v === 'login' ? 'Hiditra' : 'Hamorona kaonty'}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Left: Branding ── */}
      <div className="relative flex flex-col justify-center gap-8 px-16 py-28 border-r border-white/8 overflow-hidden">
        <button onClick={() => navigate('home')} className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-30">
          <Home className="w-4 h-4" />
          <span className="text-[0.65rem] font-bold uppercase tracking-wider">Hianatolo</span >
        </button>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_30%_50%,rgba(74,222,128,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute w-72 h-72 rounded-full border border-green-400/8 -right-16 -bottom-16 pointer-events-none" />
        <div className="absolute w-40 h-40 rounded-full border border-green-400/5 right-10 bottom-10 pointer-events-none" />

        <div key={view}>   {/* key forces re-mount → CSS anim replays */}
          <p className="text-[0.6rem] tracking-[0.35em] uppercase text-white/40 mb-4">{brand.eyebrow}</p>
          <h1 className="font-['Space_Grotesk'] font-extrabold text-[clamp(2.8rem,4vw,4.5rem)] leading-[1.05] tracking-tight">
            {brand.headline}
          </h1>
        </div>

        <p className="text-[0.82rem] leading-relaxed text-white/40 max-w-xs font-light">{brand.desc}</p>

        <div className="flex gap-10 pt-6 border-t border-white/8">
          {STATS.map(([n, l]) => (
            <div key={l}>
              <p className="font-['Space_Grotesk'] font-bold text-2xl">{n}</p>
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Forms ── */}
      <div className="flex flex-col justify-center px-16 py-28">
        {view === 'login'
          ? <LoginForm navigate={navigate} onSwitch={() => setView('register')} />
          : <RegisterForm navigate={navigate} onSwitch={() => setView('login')} />
        }
      </div>

    </div>
  )
}

// ────────────────────────────────────────────
function LoginForm({ navigate, onSwitch }) {
  const { values, errors, loading, handleChange, handleSubmit } = useLoginForm(
    async (vals) => { await loginRequest(vals); navigate('home') }
  )

  return (
    <div className="flex flex-col gap-6 animate-[fadeUp_.4s_ease_both]">
      <div>
        <h2 className="font-['Space_Grotesk'] font-extrabold text-[2.2rem] tracking-tight">Hiditra.</h2>
        <p className="text-[0.78rem] text-white/40 mt-1 font-light">Ampidiro ny mombamomba anao hanohizana</p>
      </div>

      <AuthField type="email" name="email" placeholder="Adiresy mailaka"
        autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
      <AuthField type="password" name="password" placeholder="Teny miafina"
        autoComplete="current-password" value={values.password} onChange={handleChange} error={errors.password} />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-[0.7rem] text-white/40 cursor-pointer">
          <input type="checkbox" name="remember" checked={values.remember}
            onChange={handleChange} className="accent-green-400" />
          Tadidio aho
        </label>
        <button type="button" className="text-[0.7rem] text-white/40 hover:text-white transition-colors">
          Adino ny teny miafina?
        </button>
      </div>

      {errors.form && <p className="text-[0.7rem] text-red-400 text-center">{errors.form}</p>}

      <button onClick={handleSubmit} disabled={loading}
        className="w-full py-4 rounded-full bg-white text-[#121622] text-[0.65rem] font-medium
                   uppercase tracking-widest hover:bg-green-400 hover:shadow-[0_0_24px_rgba(74,222,128,.3)]
                   disabled:opacity-40 transition-all">
        {loading ? 'Miditra…' : 'Hiditra'}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/8" />
        <span className="text-[0.6rem] uppercase tracking-widest text-white/30">vaovao eto?</span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      <p className="text-[0.7rem] text-white/40 text-center">
        Mbola tsy manana kaonty?&nbsp;
        <button onClick={onSwitch} className="text-white/80 underline underline-offset-2 hover:no-underline">
          Mamorona kaonty
        </button>
      </p>
    </div>
  )
}

// ────────────────────────────────────────────
function RegisterForm({ navigate, onSwitch }) {
  const { values, errors, loading, handleChange, handleSubmit } = useRegisterForm(
    async (vals) => { await registerRequest(vals); navigate('home') }
  )
  const strength = getStrength(values.password)

  return (
    <div className="flex flex-col gap-5 animate-[fadeUp_.4s_ease_both]">
      <div>
        <h2 className="font-['Space_Grotesk'] font-extrabold text-[2.2rem] tracking-tight">Hamorona kaonty.</h2>
        <p className="text-[0.78rem] text-white/40 mt-1 font-light">Fenoy vetivety ny mombamomba anao</p>
      </div>

      <AuthField type="email" name="email" placeholder="Adiresy mailaka" autoComplete="email"
        value={values.email} onChange={handleChange} error={errors.email} />

      <div>
        <AuthField type="password" name="password" placeholder="Teny miafina" autoComplete="new-password"
          value={values.password} onChange={handleChange} error={errors.password} />
        {values.password && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-0.5 flex-1 rounded transition-all ${strength.segColor(i)}`} />
              ))}
            </div>
            <p className={`text-[0.6rem] mt-1 ${strength.color}`}>{strength.label}</p>
          </div>
        )}
      </div>

      <AuthField type="password" name="confirmPassword" placeholder="Hamafiso ny teny miafina" autoComplete="new-password"
        value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" name="terms" checked={values.terms}
          onChange={handleChange} className="accent-green-400 mt-0.5 shrink-0" />
        <span className="text-[0.7rem] text-white/40 leading-relaxed">
          Manaiky ny{' '}
          <button type="button" className="text-white/70 underline underline-offset-2">Fepetra fampiasana</button>
          {' '}sy{' '}
          <button type="button" className="text-white/70 underline underline-offset-2">Politika fiarovana</button>
        </span>
      </label>
      {errors.terms && <p className="text-[0.62rem] text-red-400 -mt-3">{errors.terms}</p>}

      {errors.form && <p className="text-[0.7rem] text-red-400 text-center">{errors.form}</p>}

      <button onClick={handleSubmit} disabled={loading}
        className="w-full py-4 rounded-full bg-white text-[#121622] text-[0.65rem] font-medium
                   uppercase tracking-widest hover:bg-green-400 hover:shadow-[0_0_24px_rgba(74,222,128,.3)]
                   disabled:opacity-40 transition-all">
        {loading ? 'Mamorona kaonty…' : 'Hamorona kaonty'}
      </button>

      <p className="text-[0.7rem] text-white/40 text-center">
        Efa manana kaonty?&nbsp;
        <button onClick={onSwitch} className="text-white/80 underline underline-offset-2 hover:no-underline">
          Hiditra
        </button>
      </p>
    </div>
  )
}