import { useEffect, useState } from 'react'
import { fetchNews, type NewsItem } from '../api/news'

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchNews()
      .then(setNews)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h1>Новости</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      <div className="news">
        {news.map(({ id, published_at, title, text }) => (
          <article key={id} className="card">
            <time>{published_at}</time>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
