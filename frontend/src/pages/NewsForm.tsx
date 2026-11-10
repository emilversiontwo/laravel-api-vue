import { useEffect, useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../api/client'
import { createNews, fetchNewsItem, updateNews } from '../api/news'
import { useAuth } from '../hooks/useAuth'

export default function NewsForm() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (!id) return
    fetchNewsItem(id)
      .then((item) => {
        setTitle(item.title)
        setText(item.text)
      })
      .catch((e: Error) => setErrors([e.message]))
  }, [id])

  if (loading) return <p>Загрузка...</p>
  if (!user) return <Navigate to="/login" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrors([])
    try {
      if (id) await updateNews(id, { title, text })
      else await createNews({ title, text })
      navigate('/news')
    } catch (err) {
      setErrors(err instanceof ApiError ? [...Object.values(err.errors).flat(), ...(err.status === 403 ? [err.message] : [])] : ['Не удалось сохранить'])
    }
  }

  return (
    <section className="form-page">
      <h1>{id ? 'Изменить новость' : 'Новая новость'}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Заголовок
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Текст
          <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} required />
        </label>
        {errors.map((message) => (
          <p key={message} className="form__error">
            {message}
          </p>
        ))}
        <button className="button">Сохранить</button>
      </form>
    </section>
  )
}
