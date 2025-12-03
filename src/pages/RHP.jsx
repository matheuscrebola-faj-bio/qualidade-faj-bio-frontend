import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import ModalCriar from '../components/ModalCriar'
import ModalAcompanhantes from '../components/ModalAcompanhantes'
import ModalRastreabilidade from '../components/ModalRastreabilidade'
import ModalMontagem from '../components/ModalMontagem'
import ModalTestesIniciais from '../components/ModalTestesIniciais'
import ModalComunicacao from '../components/ModalComunicacao'
import ModalBurnIn from '../components/ModalBurnIn'
import ModalTestesFinais from '../components/ModalTestesFinais'
import ModalChecklist from '../components/ModalChecklist'
import ModalQuarentena from '../components/ModalQuarentena'
import ModalEmbalagem from '../components/ModalEmbalagem'
import ModalInspecao from '../components/ModalInspecao'
import ModalEstoque from '../components/ModalEstoque'
import ModalFinalizado from '../components/ModalFinalizado'

const API_BASE = 'http://localhost:50000'

function RHP() {
  const { token, funcao, canCreate } = useAuth()
  const navigate = useNavigate()
  
  const [rhps, setRhps] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModalCriar, setShowModalCriar] = useState(false)
  const [selectedRhp, setSelectedRhp] = useState(null)

  const fetchRhps = async () => {
    try {
      const response = await fetch(`${API_BASE}/rhp/funcao`, {
        headers: { 'token': `${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setRhps(data)
      }
    } catch (err) {
      console.error('Erro ao buscar RHPs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRhps()
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR')
  }

  const formatLocalizacao = (loc) => {
    return loc.replace(/_/g, ' ')
  }

  const handleRhpClick = (rhp) => {
    setSelectedRhp(rhp)
  }

  const closeModal = () => {
    setSelectedRhp(null)
    fetchRhps() // Atualiza lista após fechar modal
  }

  const renderModal = () => {
    if (!selectedRhp) return null

    const props = { rhp: selectedRhp, onClose: closeModal, token }

    switch (selectedRhp.localizacao) {
      case 'ACOMPANHANTES':
        return <ModalAcompanhantes {...props} />
      case 'RASTREABILIDADE':
        return <ModalRastreabilidade {...props} />
      case 'MONTAGEM':
        return <ModalMontagem {...props} />
      case 'TESTES_INICIAIS':
        return <ModalTestesIniciais {...props} />
      case 'COMUNICACAO':
        return <ModalComunicacao {...props} />
      case 'BURN_IN':
        return <ModalBurnIn {...props} />
      case 'TESTES_FINAIS':
        return <ModalTestesFinais {...props} />
      case 'CHECKLIST':
        return <ModalChecklist {...props} />
      case 'QUARENTENA':
        return <ModalQuarentena {...props} />
      case 'EMBALAGEM':
        return <ModalEmbalagem {...props} />
      case 'INSPECAO':
        return <ModalInspecao {...props} />
      case 'ESTOQUE':
        return <ModalEstoque {...props} />
      case 'FINALIZADO':
        return <ModalFinalizado {...props} />
      default:
        return null
    }
  }

  return (
    <div className="rhp-page">
      <div className="rhp-header">
        <button className="btn-back" onClick={() => navigate('/')}>
          ←
        </button>
        <span className="rhp-title">RHP</span>
        <button 
          className="btn-add" 
          disabled={!canCreate}
          onClick={() => setShowModalCriar(true)}
          title={canCreate ? 'Criar RHP' : 'Sem permissão'}
        >
          +
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <span>Carregando...</span>
        </div>
      ) : rhps.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>Nenhum RHP na sua fila</p>
        </div>
      ) : (
        <div className="rhp-list">
          {rhps.map((rhp) => (
            <div 
              key={rhp.id} 
              className="rhp-item"
              onClick={() => handleRhpClick(rhp)}
            >
              <div className="rhp-item-header">
                <span className="rhp-item-id">RHP #{rhp.id}</span>
                <span className="rhp-item-date">{formatDate(rhp.data)}</span>
              </div>
              <span className="rhp-item-loc">
                {formatLocalizacao(rhp.localizacao)}
              </span>
            </div>
          ))}
        </div>
      )}

      {showModalCriar && (
        <ModalCriar 
          onClose={() => {
            setShowModalCriar(false)
            fetchRhps()
          }} 
          token={token} 
        />
      )}

      {renderModal()}
    </div>
  )
}

export default RHP
