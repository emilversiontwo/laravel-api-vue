import { NavLink } from 'react-router-dom'
import './Header.css'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О нас' },
  { to: '/services', label: 'Услуги' },
  { to: '/news', label: 'Новости' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="header__logo">
          Laravel<span>Mongo</span>
        </NavLink>
        <nav className="header__nav">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
