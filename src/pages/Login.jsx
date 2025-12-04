import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'

const API_BASE = 'http://191.252.218.127:8080'

function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      })

      if (!response.ok) {
        throw new Error('Credenciais inválidas')
      }

      const data = await response.json()
      login(data.token, data.funcao)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-logo">
        <span>Q</span>
      </div>
      <h1 className="login-title">Qualidade FAJ Bio</h1>
      <p className="login-subtitle">Sistema de Controle de Qualidade</p>

      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-msg">{error}</div>}
        
        <div className="input-group">
          <label>Usuário</label>
          <input
            type="text"
            placeholder="Digite seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default Login
