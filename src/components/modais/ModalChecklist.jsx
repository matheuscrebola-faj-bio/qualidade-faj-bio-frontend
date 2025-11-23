import { useState } from 'react'

function ModalChecklist({ formId, token, onClose }) {
  const [formData, setFormData] = useState({
    rotulagem: false,
    et17: false,
    et21: false,
    acessorios: false,
    rabichos: false,
    estado: false,
    certificado: false,
    et18: false,
    observacoes: '',
    colaborador: '',
    data: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:8080/api/formularios/${formId}/checklist`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Dados salvos com sucesso!')
        onClose()
      } else {
        alert('Erro ao salvar dados')
      }
    } catch (error) {
      alert('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-red-700 mb-4">Checklist</h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="rotulagem"
                checked={formData.rotulagem}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-700">Rotulagem</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="et17"
                checked={formData.et17}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-700">ET17</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="et21"
                checked={formData.et21}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-700">ET21</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="acessorios"
                checked={formData.acessorios}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-700">Acessórios</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="rabichos"
                checked={formData.rabichos}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-700">Rabichos</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="estado"
                checked={formData.estado}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-700">Estado</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="certificado"
                checked={formData.certificado}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-700">Certificado</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="et18"
                checked={formData.et18}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-700">ET18</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Colaborador</label>
              <input
                type="text"
                name="colaborador"
                value={formData.colaborador}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Data</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded font-semibold disabled:bg-gray-400"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalChecklist
