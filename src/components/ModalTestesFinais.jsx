import { useState } from 'react'

const API_BASE = 'http://localhost:8080'

function ModalTestesFinais({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    tecnico: '',
    resultado: 'APROVADO',
    tensaoSaida: '',
    correnteSaida: '',
    potencia: '',
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
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/testes-finais`, {
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
          <h2>Testes Finais - RHP #{rhp.id}</h2>
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

              <div className="form-row">
                <div className="form-field">
                  <label>Tensão Saída (V)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="tensaoSaida"
                    value={form.tensaoSaida}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Corrente Saída (A)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="correnteSaida"
                    value={form.correnteSaida}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Potência (W)</label>
                <input
                  type="number"
                  step="0.01"
                  name="potencia"
                  value={form.potencia}
                  onChange={handleChange}
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

export default ModalTestesFinais
