import { useState } from 'react'

const API_BASE = 'http://localhost:8080'

function ModalRastreabilidade({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    lote: '',
    validade: '',
    fornecedor: '',
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
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/rastreabilidade`, {
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
          <h2>Rastreabilidade - RHP #{rhp.id}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Lote</label>
                  <input
                    type="text"
                    name="lote"
                    value={form.lote}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Validade</label>
                  <input
                    type="date"
                    name="validade"
                    value={form.validade}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Fornecedor</label>
                <input
                  type="text"
                  name="fornecedor"
                  value={form.fornecedor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Observações</label>
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
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalRastreabilidade
