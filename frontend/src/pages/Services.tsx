const services = [
  { title: 'Разработка сайтов', text: 'Адаптивные сайты и лендинги под ключ.' },
  { title: 'REST API', text: 'Проектирование и реализация API на Laravel.' },
  { title: 'Docker', text: 'Настройка воспроизводимого окружения разработки.' },
  { title: 'Поддержка', text: 'Сопровождение и развитие готовых проектов.' },
]

export default function Services() {
  return (
    <section>
      <h1>Услуги</h1>
      <div className="cards">
        {services.map(({ title, text }) => (
          <article key={title} className="card">
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
