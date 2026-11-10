import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Добро пожаловать</h1>
        <p>Учебный проект на Laravel, React и MongoDB в Docker-окружении.</p>
        <Link to="/services" className="button">
          Наши услуги
        </Link>
      </section>
      <section className="cards">
        <article className="card">
          <h3>Laravel</h3>
          <p>Серверная часть и REST API.</p>
        </article>
        <article className="card">
          <h3>React</h3>
          <p>Клиентская часть на Vite и TypeScript.</p>
        </article>
        <article className="card">
          <h3>MongoDB</h3>
          <p>Документная база данных для хранения контента.</p>
        </article>
      </section>
    </>
  )
}
