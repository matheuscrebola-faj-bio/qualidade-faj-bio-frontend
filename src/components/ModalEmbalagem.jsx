import { useState } from 'react'

const API_BASE = 'http://localhost:8080'

function ModalEmbalagem({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    operador: '',
    tipoEmbalagem: '',
    quantidade: '',
    pesoFinal: '',
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
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/embalagem`, {
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
          <h2>Embalagem - RHP #{rhp.id}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-field">
                <label>Operador</label>
                <input
                  type="text"
                  name="operador"
                  value={form.operador}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Tipo de Embalagem</label>
                <select
                  name="tipoEmbalagem"
                  value={form.tipoEmbalagem}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="CAIXA">Caixa</option>
                  <option value="SACOLA">Sacola</option>
                  <option value="PALLET">Pallet</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Quantidade</label>
                  <input
                    type="number"
                    name="quantidade"
                    value={form.quantidade}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Peso Final (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="pesoFinal"
                    value={form.pesoFinal}
                    onChange={handleChange}
                  />
                </div>
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

export default ModalEmbalagem
