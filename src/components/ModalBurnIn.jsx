import { useState } from 'react'

const API_BASE = 'http://localhost:50000'

function ModalBurnIn({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    tecnico: '',
    temperaturaInicial: '',
    temperaturaFinal: '',
    duracao: '',
    resultado: 'APROVADO',
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
                <label>Técnico</label>
                <input
                  type="text"
                  name="tecnico"
                  value={form.tecnico}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Temp. Inicial (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperaturaInicial"
                    value={form.temperaturaInicial}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Temp. Final (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperaturaFinal"
                    value={form.temperaturaFinal}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Duração (horas)</label>
                <input
                  type="number"
                  step="0.5"
                  name="duracao"
                  value={form.duracao}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Resultado</label>
                <select
                  name="resultado"
                  value={form.resultado}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
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

export default ModalBurnIn
