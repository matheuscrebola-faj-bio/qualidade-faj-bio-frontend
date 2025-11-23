import { useState } from 'react'
import Login from './pages/Login'
import CriacaoFormulario from './pages/CriacaoFormulario'
import ListaFormularios from './pages/ListaFormularios'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [tela, setTela] = useState('login')

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setTela('lista')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    setTela('login')
  }

  if (!token || tela === 'login') {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-red-700 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FAJ BIO - Qualidade</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setTela('lista')}
              className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded"
            >
              Formulários
            </button>
            <button
              onClick={() => setTela('criar')}
              className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded"
            >
              Criar Formulário
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-900 hover:bg-red-950 rounded"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {tela === 'criar' && <CriacaoFormulario token={token} />}
        {tela === 'lista' && <ListaFormularios token={token} />}
      </div>
    </div>
  )
}

export default App
