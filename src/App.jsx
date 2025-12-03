import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import RHP from './pages/RHP'
import './index.css'

// Contexto de autenticação
export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

// Componente de rota protegida
function ProtectedRoute({ children }) {
  const { token } = useAuth()
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [funcao, setFuncao] = useState(localStorage.getItem('funcao'))

  const login = (newToken, newFuncao) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('funcao', newFuncao)
    setToken(newToken)
    setFuncao(newFuncao)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('funcao')
    setToken(null)
    setFuncao(null)
  }

  // Verifica se pode criar formulários (PCP ou ADM)
  const canCreate = funcao === 'PCP' || funcao === 'ADM'

  return (
    <AuthContext.Provider value={{ token, funcao, login, logout, canCreate }}>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/rhp" element={
              <ProtectedRoute>
                <RHP />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
