// hooks/useAuthForm.js
import { useState } from 'react'

export function useLoginForm(onSubmit) {
  const [values, setValues] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = ({ email, password }) => {
    const e = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.'
    if (password.length < 8) e.password = 'At least 8 characters.'
    return e
  }

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setValues(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
    setErrors(p => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async () => {
    const errs = validate(values)
    if (Object.keys(errs).length) return setErrors(errs)
    setLoading(true)
    try { await onSubmit(values) }
    catch (err) { setErrors({ form: err.message }) }
    finally { setLoading(false) }
  }

  return { values, errors, loading, handleChange, handleSubmit }
}

export function useRegisterForm(onSubmit) {
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '', terms: false })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = ({ email, password, confirmPassword, terms }) => {
    const e = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.'
    if (password.length < 8) e.password = 'At least 8 characters.'
    if (confirmPassword !== password) e.confirmPassword = 'Passwords do not match.'
    if (!terms) e.terms = 'You must accept the Terms.'
    return e
  }

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setValues(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
    setErrors(p => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async () => {
    const errs = validate(values)
    if (Object.keys(errs).length) return setErrors(errs)
    setLoading(true)
    try { await onSubmit(values) }
    catch (err) { setErrors({ form: err.message }) }
    finally { setLoading(false) }
  }

  return { values, errors, loading, handleChange, handleSubmit }
}