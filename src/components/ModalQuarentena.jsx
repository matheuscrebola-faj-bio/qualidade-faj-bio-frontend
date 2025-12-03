import { useState } from 'react'

const API_BASE = 'http://localhost:50000'

function ModalQuarentena({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    responsavel: '',
    motivo: '',
    dataEntrada: '',
    dataSaida: '',
    acao: '',
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
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/quarentena`, {
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
          <h2>Quarentena - RHP #{rhp.id}</h2>
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
                <label>Motivo</label>
                <input
                  type="text"
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Data Entrada</label>
                  <input
                    type="date"
                    name="dataEntrada"
                    value={form.dataEntrada}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Data Saída</label>
                  <input
                    type="date"
                    name="dataSaida"
                    value={form.dataSaida}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Ação Corretiva</label>
                <input
                  type="text"
                  name="acao"
                  value={form.acao}
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

export default ModalQuarentena
