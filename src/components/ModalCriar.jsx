import { useState } from 'react'

const API_BASE = 'http://191.252.218.127:8080'

function ModalCriar({ onClose, token }) {
  const [form, setForm] = useState({
    codigo: '',
    op: '',
    data: '',
    serie: '',
    qntd: ''
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
      const response = await fetch(`${API_BASE}/eletro-system`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': `${token}`
        },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        onClose()
      } else {
        alert('Erro ao criar RHP')
      }
    } catch (err) {
      alert('Erro ao criar RHP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Criar RHP Eletro System</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-field">
                <label>Código</label>
                <input
                  type="text"
                  name="codigo"
                  value={form.codigo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>OP</label>
                <input
                  type="text"
                  name="op"
                  value={form.op}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Data</label>
                  <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Série</label>
                  <input
                    type="text"
                    name="serie"
                    value={form.serie}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Quantidade</label>
                <input
                  type="number"
                  name="qntd"
                  min="1"
                  value={form.qntd}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar RHP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalCriar
