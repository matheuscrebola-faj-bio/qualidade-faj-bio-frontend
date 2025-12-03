import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'

function Home() {
  const { funcao, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <header className="header">
        <div className="header-info">
          <h1>Qualidade FAJ Bio</h1>
          <span className="header-subtitle">Controle de Qualidade</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <main className="home-content">
        <div className="welcome-card">
          <h2>Bem-vindo!</h2>
          <div className="funcao">{funcao}</div>
        </div>

        <p className="section-title">Selecione o tipo de formulário</p>

        <div className="form-grid">
          <div className="form-card" onClick={() => navigate('/rhp')}>
            <div className="form-card-icon">📋</div>
            <div className="form-card-info">
              <h3>EletroSystem</h3>
              <p>Registro de Histórico de Produto</p>
            </div>
          </div>

          {/* Outros formulários podem ser adicionados aqui */}
          <div className="form-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            <div className="form-card-icon">🔒</div>
            <div className="form-card-info">
              <h3>Em breve</h3>
              <p>Novos formulários serão adicionados</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
