# QA Test – Rubeus Quality Assessment

Este repositório contém a análise de qualidade realizada como parte de um teste técnico de QA.

## Escopo do teste
Foram analisadas duas páginas disponibilizadas para avaliação:
- https://qualidade.apprbs.com.br/certificacao  
- https://qualidade.apprbs.com.br/site  
Durante a análise foram identificados problemas funcionais, de conteúdo e de usabilidade.

---
# Relatório de Bugs
O relatório completo contém:
- descrição detalhada dos problemas encontrados
- classificação dos bugs (Tipo, Classificação e Prioridade)
- passos para reprodução
- resultado esperado e resultado atual
- evidências dos problemas identificados

O relatório e as evidências podem ser encontrados na pasta:
📁 **docs/**

---
# Testes Automatizados
Alguns cenários foram automatizados utilizando **Cypress** para validar comportamentos da aplicação.
Os testes incluem verificações como:
- presença de conteúdo placeholder (Lorem Ipsum)
- exibição de evento desatualizado
- validação de campos do formulário
- comportamento inesperado no envio do formulário

Os testes automatizados estão localizados em:
📁 **cypress/e2e/**

Arquivos principais:
- certificacao.cy.js  
- site.cy.js

---
# Como executar os testes

### 1. Clonar o repositório
git clone https://github.com/vikirinmm/PS-Qualidade-Rubeus
### 2. Entrar na pasta do projeto
cd PS-Qualidade-Rubeus
### 3. Instalar as dependências
npm install
### 4. Executar o Cypress (modo interface)
npx cypress open
ou executar os testes diretamente no terminal:
npx cypress run

---
# Estrutura do projeto

PS-Qualidade-Rubeus  
│  
├── cypress  
│   ├── e2e  
│   │   ├── certificacao.cy.js  
│   │   └── site.cy.js  
│   │  
│   ├── fixtures  
│   └── support  
│  
├── docs  
│   ├── Relatório do Certificação.pdf  
│   ├── Relatório do Certificação.docx  
│   └── evidencias  
│  
├── cypress.config.js  
├── package.json  
└── README.md  

---
# Tecnologias utilizadas
- Cypress  
- JavaScript  
- Node.js

---
# Autor
Vinícius Antônio Moreira Lemes
