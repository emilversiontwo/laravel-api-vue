import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteNews, fetchNews, type NewsItem } from '../api/news'
import { useAuth } from '../hooks/useAuth'

export default function News() {
  const { user } = useAuth()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchNews()
      .then(setNews)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Удалить новость?')) return
    try {
      await deleteNews(id)
      setNews((items) => items.filter((item) => item.id !== id))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <section>
      <div className="page-head">
        <h1>Новости</h1>
        {user && (
          <Link to="/news/new" className="button">
            Добавить
          </Link>
        )}
      </div>
      {loading && <p>Загрузка...</p>}
      {error && <p className="form__error">{error}</p>}
      <div className="news">
        {news.map(({ id, published_at, title, text, user_id, author_name }) => (
          <article key={id} className="card">
            <time>
              {published_at} · {author_name}
            </time>
            <h3>{title}</h3>
            <p>{text}</p>
            {user?.id === user_id && (
              <div className="card__actions">
                <Link to={`/news/${id}/edit`}>Изменить</Link>
                <button onClick={() => handleDelete(id)}>Удалить</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
