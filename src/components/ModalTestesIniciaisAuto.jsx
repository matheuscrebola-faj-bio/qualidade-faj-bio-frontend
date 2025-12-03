import { useState } from 'react'

const API_BASE = 'http://localhost:50000'

function ModalTestesIniciaisAuto({ rhp, onClose, token }) {
  const [form, setForm] = useState({
    validadeFuga: '',
    dispositivoGiga: '',
    dispositivoPlaca: '',
    parametrosFuga: '',
    autoCalibracao: '',
    testPassed: '',
    imprimir1: '',
    tensaoGiga: '',
    testFailed: '',
    imprimir2: ''
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
      const response = await fetch(`${API_BASE}/rhp/${rhp.id}/testes-iniciais/corrente-fuga-auto`, {
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
          <h2>2.3 - Testes Iniciais - Ensaio de Corrente</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-form">

              <div className="form-field">
                <label>Validade da Calibração QA-90</label>
                <select
                  name="validadeFuga"
                  value={form.validadeFuga}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Dispositivo Giga</label>
                <select
                  name="dispositivoGiga"
                  value={form.dispositivoGiga}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Placa de Cobre</label>
                <select
                  name="dispositivoPlaca"
                  value={form.dispositivoPlaca}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Parâmetros</label>
                <select
                  name="parametrosFuga"
                  value={form.parametrosFuga}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Auto-calibração</label>
                <select
                  name="autoCalibracao"
                  value={form.autoCalibracao}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Pré Teste 1</label>
                <select
                  name="testPassed"
                  value={form.testPassed}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Imprimir Pré Teste 1</label>
                <select
                  name="imprimir1"
                  value={form.imprimir1}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Tensão Pilha</label>
                <select
                  name="tensaoGiga"
                  value={form.tensaoGiga}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Pré Teste 2</label>
                <select
                  name="testFailed"
                  value={form.testFailed}
                  onChange={handleChange}
                  required
                >
                  <option value="APROVADO">Aprovado</option>
                  <option value="REPROVADO">Reprovado</option>
                </select>
              </div>

              <div className="form-field">
                <label>Imprimir Pré Teste 2</label>
                <select
                  name="imprimir2"
                  value={form.imprimir2}
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

export default ModalTestesIniciaisAuto
