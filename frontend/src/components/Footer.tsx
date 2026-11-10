import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} LaravelMongo. Все права защищены.</p>
        <nav>
          <Link to="/about">О нас</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
      </div>
    </footer>
  )
}
