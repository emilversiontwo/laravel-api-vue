const news = [
  { date: '2026-11-10', title: 'Запущено Docker-окружение', text: 'Laravel, React и MongoDB работают в контейнерах.' },
  { date: '2026-11-10', title: 'Подключена MongoDB', text: 'Laravel работает с базой через mongodb/laravel-mongodb.' },
  { date: '2026-11-10', title: 'Готов каркас сайта', text: 'Добавлены шапка, подвал и пять страниц.' },
]

export default function News() {
  return (
    <section>
      <h1>Новости</h1>
      <div className="news">
        {news.map(({ date, title, text }) => (
          <article key={title} className="card">
            <time>{date}</time>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
