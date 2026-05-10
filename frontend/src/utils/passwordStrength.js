// utils/passwordStrength.js
export function getStrength(password) {
  let score = 0
  if (password.length >= 8)          score++
  if (/[A-Z]/.test(password))        score++
  if (/[0-9]/.test(password))        score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return {
    score,
    label: ['', '', 'Weak', 'Fair', 'Strong'][score],
    color: ['', '', 'text-red-400', 'text-orange-400', 'text-green-400'][score],
    segColor: (i) => i <= score
      ? score <= 1 ? 'bg-red-400' : score === 2 ? 'bg-orange-400' : 'bg-green-400'
      : 'bg-white/10',
  }
}