// components/AuthField.jsx
export function AuthField({ type = 'text', name, placeholder, value, onChange, error, autoComplete }) {
  return (
    <div className={`border-b pb-2 transition-colors ${
      error ? 'border-red-400' : 'border-white/15 focus-within:border-white/50'
    }`}>
      <input
        id={name} type={type} name={name} value={value}
        onChange={onChange} placeholder={placeholder}
        autoComplete={autoComplete} aria-label={placeholder}
        className="w-full bg-transparent font-['DM_Sans'] text-sm text-white font-light
                   outline-none placeholder:text-white/20"
      />
      {error && <p className="text-[0.62rem] text-red-400 mt-1">{error}</p>}
    </div>
  )
}