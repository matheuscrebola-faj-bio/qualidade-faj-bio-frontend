import { useState, useEffect } from 'react'
import ModalAcompanhantes from '../components/modais/ModalAcompanhantes'
import ModalRastreabilidade from '../components/modais/ModalRastreabilidade'
import ModalMontagem from '../components/modais/ModalMontagem'
import ModalBurnIn from '../components/modais/ModalBurnIn'
import ModalChecklist from '../components/modais/ModalChecklist'

function ListaFormularios({ token }) {
  const [formularios, setFormularios] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalAberto, setModalAberto] = useState(null)
  const [formSelecionado, setFormSelecionado] = useState(null)

  useEffect(() => {
    carregarFormularios()
  }, [])

  const carregarFormularios = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/formularios', {
        headers: {
          'token': token,
        },
      })
      const data = await response.json()
      setFormularios(data)
    } catch (error) {
      alert('Erro ao carregar formulários')
    } finally {
      setLoading(false)
    }
  }

  const abrirModal = (formulario) => {
    setFormSelecionado(formulario)
    setModalAberto(formulario.localizacao)
  }

  const fecharModal = () => {
    setModalAberto(null)
    setFormSelecionado(null)
    carregarFormularios()
  }

  const getCorLocalizacao = (localizacao) => {
    const cores = {
      ACOMPANHANTES: 'bg-blue-100 text-blue-800',
      RASTREABILIDADE: 'bg-green-100 text-green-800',
      MONTAGEM: 'bg-yellow-100 text-yellow-800',
      TESTES_INICIAIS: 'bg-purple-100 text-purple-800',
      COMUNICACAO: 'bg-pink-100 text-pink-800',
      BURN_IN: 'bg-orange-100 text-orange-800',
      TESTES_FINAIS: 'bg-indigo-100 text-indigo-800',
      CHECKLIST: 'bg-teal-100 text-teal-800',
      QUARENTENA: 'bg-red-100 text-red-800',
      EMBALAGEM: 'bg-cyan-100 text-cyan-800',
      INSPECAO: 'bg-lime-100 text-lime-800',
      ESTOQUE: 'bg-emerald-100 text-emerald-800',
      FINALIZADO: 'bg-gray-100 text-gray-800',
    }
    return cores[localizacao] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-700 mb-6">Lista de Formulários</h2>

      <div className="grid gap-4">
        {formularios.map((form) => (
          <div
            key={form.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => abrirModal(form)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{form.formulario}</h3>
                <p className="text-gray-600">Data: {form.data}</p>
                <p className="text-gray-600">Função: {form.funcao}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCorLocalizacao(form.localizacao)}`}>
                  {form.localizacao}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalAberto === 'ACOMPANHANTES' && (
        <ModalAcompanhantes
          formId={formSelecionado.id}
          token={token}
          onClose={fecharModal}
        />
      )}

      {modalAberto === 'RASTREABILIDADE' && (
        <ModalRastreabilidade
          formId={formSelecionado.id}
          token={token}
          onClose={fecharModal}
        />
      )}

      {modalAberto === 'MONTAGEM' && (
        <ModalMontagem
          formId={formSelecionado.id}
          token={token}
          onClose={fecharModal}
        />
      )}

      {modalAberto === 'BURN_IN' && (
        <ModalBurnIn
          formId={formSelecionado.id}
          token={token}
          onClose={fecharModal}
        />
      )}

      {modalAberto === 'CHECKLIST' && (
        <ModalChecklist
          formId={formSelecionado.id}
          token={token}
          onClose={fecharModal}
        />
      )}
    </div>
  )
}

export default ListaFormularios
