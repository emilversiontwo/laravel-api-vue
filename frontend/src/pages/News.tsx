import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteNews, fetchNews, toggleLike, type NewsItem } from '../api/news'
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

  async function handleLike(id: string) {
    try {
      const updated = await toggleLike(id)
      setNews((items) => items.map((item) => (item.id === id ? updated : item)))
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
        {news.map(({ id, published_at, title, text, user_id, author_name, likes_count, liked }) => (
          <article key={id} className="card">
            <time>
              {published_at} · {author_name}
            </time>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="card__actions">
              <button
                className={liked ? 'like like--active' : 'like'}
                onClick={() => handleLike(id)}
                disabled={!user}
                title={user ? '' : 'Войдите, чтобы ставить лайки'}
              >
                {liked ? '♥' : '♡'} {likes_count}
              </button>
              {user?.id === user_id && (
                <>
                  <Link to={`/news/${id}/edit`}>Изменить</Link>
                  <button onClick={() => handleDelete(id)}>Удалить</button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
