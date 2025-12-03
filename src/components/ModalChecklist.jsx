import { useState } from 'react'

const API_BASE = 'http://localhost:8080'

function ModalChecklist({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    inspetor: '',
    visualOk: false,
    etiquetaOk: false,
    cabosOk: false,
    acessoriosOk: false,
    observacoes: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/checklist`, {
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
          <h2>Checklist - RHP #{rhp.id}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-field">
                <label>Inspetor</label>
                <input
                  type="text"
                  name="inspetor"
                  value={form.inspetor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="visualOk"
                    checked={form.visualOk}
                    onChange={handleChange}
                  />
                  Inspeção Visual OK
                </label>
              </div>

              <div className="form-field">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="etiquetaOk"
                    checked={form.etiquetaOk}
                    onChange={handleChange}
                  />
                  Etiqueta OK
                </label>
              </div>

              <div className="form-field">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="cabosOk"
                    checked={form.cabosOk}
                    onChange={handleChange}
                  />
                  Cabos OK
                </label>
              </div>

              <div className="form-field">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="acessoriosOk"
                    checked={form.acessoriosOk}
                    onChange={handleChange}
                  />
                  Acessórios OK
                </label>
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

export default ModalChecklist
