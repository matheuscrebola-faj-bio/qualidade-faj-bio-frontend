import { useState } from 'react'

function ModalAcompanhantes({ formId, token, onClose }) {
  const [formData, setFormData] = useState({
    manualOp: '',
    manualSoft: '',
    manualEletro: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:8080/api/formularios/${formId}/acompanhantes`, {
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
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold text-red-700 mb-4">Acompanhantes</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Manual OP</label>
            <input
              type="text"
              name="manualOp"
              value={formData.manualOp}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Manual Software</label>
            <input
              type="text"
              name="manualSoft"
              value={formData.manualSoft}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Manual Eletrônico</label>
            <input
              type="text"
              name="manualEletro"
              value={formData.manualEletro}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
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

export default ModalAcompanhantes
