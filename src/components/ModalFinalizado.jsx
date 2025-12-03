import { useState } from 'react'

const API_BASE = 'http://localhost:8080'

function ModalFinalizado({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    responsavel: '',
    dataFinalizacao: '',
    observacoes: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/finalizado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        onClose()
      } else {
        alert('Erro ao salvar')
      }
    } catch (err) {
      alert('Erro ao salvar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Finalizado - RHP #{rhp.id}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-field">
                <label>Responsável</label>
                <input
                  type="text"
                  name="responsavel"
                  value={form.responsavel}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Data de Finalização</label>
                <input
                  type="datetime-local"
                  name="dataFinalizacao"
                  value={form.dataFinalizacao}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Observações Finais</label>
                <textarea
                  name="observacoes"
                  value={form.observacoes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Finalizando...' : 'Finalizar RHP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalFinalizado
