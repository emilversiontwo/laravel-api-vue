import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError } from '../api/client'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrors([])
    try {
      await register(name, email, password, confirmation)
      navigate('/')
    } catch (err) {
      setErrors(err instanceof ApiError ? Object.values(err.errors).flat() : ['Не удалось зарегистрироваться'])
    }
  }

  return (
    <section className="form-page">
      <h1>Регистрация</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Имя
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Пароль
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Повторите пароль
          <input type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} required />
        </label>
        {errors.map((message) => (
          <p key={message} className="form__error">
            {message}
          </p>
        ))}
        <button className="button">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </section>
  )
}
