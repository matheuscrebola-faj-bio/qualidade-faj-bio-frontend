import { useState } from 'react'

const API_BASE = 'http://localhost:50000'

function ModalAcompanhantes({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    manualOp: '',
    manualSoft: '',
    manualEletro: ''
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
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/acompanhantes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': `${token}`
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
          <h2>Acompanhantes - RHP #{rhp.id}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-field">
                <label>Manual Operações</label>
                <input
                  name="manualOp"
                  value={form.manualOp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Manual Software</label>
                <textarea
                  name="manualSoft"
                  value={form.manualSoft}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Guia Rápido Eletro</label>
                <textarea
                  name="manualEletro"
                  value={form.manualEletro}
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

export default ModalAcompanhantes
