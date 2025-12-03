import { useState } from 'react'

const API_BASE = 'http://localhost:50000'

function ModalBurnIn({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    dtInicio: '',
    dtFim: '',
    temperatura: ''
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
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/burn-in`, {
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
          <h2>Burn In - RHP #{rhp.id}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-field">
                  <label>Data Início</label>
                  <input
                    type="datetime-local"
                    name="dtInicio"
                    value={form.dtInicio}
                    onChange={handleChange}
                    required
                  />
                </div>
              <div className="form-field">
                  <label>Data Fim</label>
                  <input
                    type="datetime-local"
                    name="dtMont"
                    value={form.dtMont}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Data Montagem</label>
                  <input
                    type="text"
                    name="temperatura"
                    value={form.temperatura}
                    onChange={handleChange}
                    required
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

export default ModalBurnIn
