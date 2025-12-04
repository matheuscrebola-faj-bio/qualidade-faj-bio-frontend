import { useState } from 'react'

const API_BASE = 'http://localhost:50000'

function ModalFinalizado({ rhp, onClose, token }) {
  const [loading, setLoading] = useState(null)
  const [showContent, setShowContent] = useState(false)

  const gerarRHP = async () => {
    setLoading('rhp')
    try {
      const response = await fetch(`${API_BASE}/eletro-system/gerar-rhp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ id: rhp.id })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `RHP_${rhp.codigo}.pdf`
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        alert('Erro ao gerar RHP')
      }
    } catch (err) {
      alert('Erro ao gerar RHP')
    } finally {
      setLoading(null)
    }
  }

  const gerarCertificado = async () => {
    setLoading('certificado')
    try {
      const response = await fetch(`${API_BASE}/eletro-system/gerar-certificado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ id: rhp.id })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `Certificado_${rhp.codigo}.pdf`
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        alert('Erro ao gerar Certificado')
      }
    } catch (err) {
      alert('Erro ao gerar Certificado')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Finalizado - {rhp.codigo}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="finalizado-buttons">
            <button
              className="btn-finalizado btn-content"
              onClick={() => setShowContent(!showContent)}
            >
              {showContent ? 'Ocultar Conteúdo' : 'Ver Conteúdo'}
            </button>

            <button
              className="btn-finalizado btn-rhp"
              onClick={gerarRHP}
              disabled={loading !== null}
            >
              {loading === 'rhp' ? 'Gerando...' : 'Gerar RHP (PDF)'}
            </button>

            <button
              className="btn-finalizado btn-certificado"
              onClick={gerarCertificado}
              disabled={loading !== null}
            >
              {loading === 'certificado' ? 'Gerando...' : 'Gerar Certificado (PDF)'}
            </button>
          </div>

          {showContent && (
            <div className="rhp-content">
              <pre>{JSON.stringify(rhp, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalFinalizado
