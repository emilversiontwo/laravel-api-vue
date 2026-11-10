import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Header.css'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О нас' },
  { to: '/services', label: 'Услуги' },
  { to: '/news', label: 'Новости' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Header() {
  const { user, loading, logout } = useAuth()

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
          {!loading &&
            (user ? (
              <>
                <span className="header__user">{user.name}</span>
                <button className="header__logout" onClick={logout}>
                  Выйти
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Войти</NavLink>
                <NavLink to="/register">Регистрация</NavLink>
              </>
            ))}
        </nav>
      </div>
    </header>
  )
}
