import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import About from './pages/About'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import Login from './pages/Login'
import News from './pages/News'
import Register from './pages/Register'
import Services from './pages/Services'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="news" element={<News />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
