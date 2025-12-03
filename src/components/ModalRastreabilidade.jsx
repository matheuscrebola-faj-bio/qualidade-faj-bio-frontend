import { useState } from 'react'

const API_BASE = 'http://localhost:50000'

function ModalRastreabilidade({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    placa: '',
    placaVer: '',
    midia: '',
    midiaVer: ''
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
          <h2>Rastreabilidade - RHP #{rhp.id}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Placa ECG</label>
                  <input
                    type="text"
                    name="placa"
                    value={form.placa}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Placa ECG - Software</label>
                  <input
                    type="text"
                    name="placaVer"
                    value={form.placaVer}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Mídia de Instalação</label>
                  <input
                    type="text"
                    name="midia"
                    value={form.midia}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Mídia de Instalação - Software</label>
                  <input
                    type="text"
                    name="midiaVer"
                    value={form.midiaVer}
                    onChange={handleChange}
                    required
                  />
                </div>
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
