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
                <label>Presença da Rotulagem</label>
                <select
                  name="rotulagem"
                  value={form.rotulagem}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>ET-17 Etiqueta Lacre Validade</label>
                <select
                  name="et17"
                  value={form.et17}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>ET-21 Etiqueta Compulsória</label>
                <select
                  name="et21"
                  value={form.et21}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Acessórios Conferidos</label>
                <select
                  name="acessorios"
                  value={form.acessorios}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Colocar Rabichos</label>
                <select
                  name="rabichos"
                  value={form.rabichos}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Verificar Estado Geral</label>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
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
