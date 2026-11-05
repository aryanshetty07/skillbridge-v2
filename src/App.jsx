import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import { ToastProvider } from './context/ToastContext'

import Home from './pages/Home'
import Careers from './pages/Careers'
import CareerDetail from './pages/CareerDetail'
import SkillGap from './pages/SkillGap'
import Roadmaps from './pages/Roadmaps'
import Projects from './pages/Projects'
import Assistant from './pages/Assistant'
import Placement from './pages/Placement'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProgressProvider>
          <HashRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/:careerId" element={<CareerDetail />} />
                <Route path="/skill-gap" element={<SkillGap />} />
                <Route path="/roadmaps" element={<Roadmaps />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/placement" element={<Placement />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </HashRouter>
        </ProgressProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
