import { useState } from 'react'

const API_BASE = 'http://191.252.218.127:8080'

function ModalTestesFinais({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    imprimir: 'APROVADO',
    verificacao: 'APROVADO',
    fc: '',
    rr: '',
    cal: ''
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
      const response = await fetch(`${API_BASE}/eletro-system/${rhp.id}/testes-finais`, {
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
          <h2>Testes Finais - Eletro System</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">

              <div className="form-field">
                <label>Imprimir Exame</label>
                <select
                  name="imprimir"
                  value={form.imprimir}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Verificar forma de Onda</label>
                <select
                  name="verificacao"
                  value={form.verificacao}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Verificar FC</label>
                <input
                  type="number"
                  name="fc"
                  value={form.fc}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Verificar RR</label>
                <input
                  type="number"
                  name="rr"
                  value={form.rr}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Verificar CAL</label>
                <input
                  type="number"
                  name="cal"
                  value={form.cal}
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

export default ModalTestesFinais
