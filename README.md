# FAJ BIO - Sistema de Qualidade

Sistema de controle de qualidade desenvolvido em React + Vite.

## Instalação

```bash
npm install
```

## Executar

```bash
npm run dev
```

## Estrutura

```
src/
├── App.jsx                 # Componente principal
├── main.jsx               # Entry point
├── index.css              # Estilos globais
├── pages/
│   ├── Login.jsx          # Tela de login
│   ├── CriacaoFormulario.jsx  # Criar formulário
│   └── ListaFormularios.jsx   # Lista de formulários
└── components/
    └── modais/
        ├── ModalAcompanhantes.jsx
        ├── ModalRastreabilidade.jsx
        ├── ModalMontagem.jsx
        ├── ModalBurnIn.jsx
        └── ModalChecklist.jsx
```

## Endpoints

- **Login:** `POST /api/login`
- **Criar Formulário:** `POST /api/formularios`
- **Listar Formulários:** `GET /api/formularios`
- **Atualizar Etapas:** `PUT /api/formularios/{formId}/{etapa}`

## Modais Implementados

- Acompanhantes
- Rastreabilidade
- Montagem
- Burn In
- Checklist

## Observações

- Adicione os demais modais seguindo o padrão dos exemplos
- Configure o backend URL em cada arquivo conforme necessário
- O sistema usa padrão de cor vermelha como tema principal
