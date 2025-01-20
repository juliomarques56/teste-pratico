# PicPay - Teste Prático QA

## Descrição do Projeto

Este projeto tem como objetivo automatizar os casos de teste da tela de login do sistema de empréstimos do PicPay `https://meus-emprestimos.picpay.com/`. Utilizando o Cypress, ele valida o comportamento da aplicação em diferentes resoluções de tela (Full HD, HD e Mobile). O projeto segue boas práticas de desenvolvimento, incluindo o uso de ferramentas de linting, formatação de código, padronização de commits e execução automatizada via pipeline.

## Estrutura de Pastas

```bash

├── .github/                            # Configurações específicas do GitHub
│   └── workflows/                      # Workflows do GitHub Actions
│       └── pipeline.yml                # Configuração da pipeline de CI
├── .husky/                             # Configurações de hooks do Git
│   ├── commit-msg                      # Hook para validar mensagens de commit
│   ├── pre-commit                      # Hook para ações antes do commit
│   └── _/                              # Scripts auxiliares do Husky
│       └── husky.sh                    # Script principal do Husky
├── cypress/                            # Diretório principal do Cypress
│   ├── e2e/                            # Contém os testes end-to-end
│   │   └── acess_loans.cy.js           # Arquivo de especificação dos testes
│   ├── fixtures/                       # Arquivos de dados estáticos para uso nos testes
│   │   ├── resolutions.json            # Dados das resoluções
│   │   └── testData.js                 # Textos da aplicação
│   ├── support/                        # Arquivos de suporte para os testes
│   │   ├── selectors/                  # Seletores da aplicação
│   │   │   └── loanPageSelectors.js    # Seletores da pagina de acesso
│   │   ├── commands.js                 # Comandos customizados do Cypress
│   │   └── e2e.js                      # Configurações globais para os testes
│   ├── screenshots/                    # Capturas de tela geradas durante os testes
├── node_modules/                       # Módulos Node.js instalados
├── .prettierignore                     # Arquivo que define os caminhos ignorados pelo Prettier
├── .eslint.config.js                   # Configuração do ESLint
├── .commitlint.config.js               # Configuração do Commitlint para validar mensagens de commit
├── .prettierrc                         # Configuração do Prettier
├── cypress.config.js                   # Configuração principal do Cypress
├── package.json                        # Dependências e scripts do projeto
├── package-lock.json                   # Lockfile do npm para controle de versões
└── README.md                           # Documentação do projeto
```

## Requisitos

Antes de rodar os testes, é necessário ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão >= 16.x)
- **npm** (gerenciador de pacotes)

## Como Baixar e Executar os Testes

### Passo 1: Clonar o Repositório

Primeiramente, clone o repositório para o seu ambiente local:

```bash
git clone -b challenge-qa https://github.com/juliomarques56/teste-pratico.git
```

### Passo 2: Instalar as Dependências

Após clonar o repositório, navegue até a pasta do projeto e instale as dependências:

```bash
cd teste-pratico 
npm install
```

### Passo 3: Executar os Testes

Com as dependências instaladas, você pode rodar os testes utilizando o script definido no `package.json`:

Executar todos os testes em modo headless (sem interface gráfica).
```bash
npm run test
```

Abre a interface gráfica do Cypress para que os testes possam ser executados manualmente ou visualizados em tempo real.
```bash
npm run open
```

Os testes serão executados e, ao final, será gerado um relatório com os resultados.

### Passo 4: Gerar Relatório Allure

Para gerar o relatório de execução do Allure, basta rodar o comando:

```bash
npm run report:allure
```

Isso gerará as pastas **allure-report** e **allure-results** e abrirá o relatório de forma interativa.
![Allure](https://gitlab.com/juliomarques/imagens/-/raw/master/imagens/relatorio-teste.png?ref_type=heads)

### Passo 5: Gerar screenshots

Ao final das execuções de cada teste é gerado screenshots na pasta screenshots.

- **Resolução FULL HD**

![Full HD](https://gitlab.com/juliomarques/imagens/-/raw/master/imagens/mensagem-cpf-invalido_1920x1080.png?ref_type=heads)

- **Resolução HD**

![HD](https://gitlab.com/juliomarques/imagens/-/raw/master/imagens/mensagem-cpf-invalido_1366x768.png?ref_type=heads)

- **Resolução MOBILE**

![MOBILE](https://gitlab.com/juliomarques/imagens/-/raw/master/imagens/mensagem-cpf-invalido_375x667.png?ref_type=heads)

### Passo 6: Integração Contínua (CI)

Este projeto está configurado para rodar testes automaticamente em um pipeline de CI, utilizando o GitHub Actions.

A pipeline está configurado em um arquivo YAML chamando `pipeline.yml` dentro da pasta `.github/workflows`.

- **Execução da pipeline**

![pipeline](https://gitlab.com/juliomarques/imagens/-/raw/master/imagens/pipeline_cypress.png?ref_type=heads)

## Casos de Teste

Todos os casos de teste são executados nas resoluções Full HD, HD e Mobile, garantindo que o comportamento da aplicação seja validado adequadamente em diferentes tamanhos de tela.

- **Validar conteúdo inicial da página de empréstimos**
   - Valida se os textos esperados estão presentes nos elementos da página

- **Validar mensagem de erro ao informar CPF inválido**
   - Digita um CPF inválido no campo e valida a mensagem de erro exibida.

- **Validar mensagem de erro para campo CPF obrigatório**
   - Simula um clique no campo CPF e no botão de acesso sem preencher o CPF.

- **Validar alteração do contorno do campo cpf ao clicar em Acessar sem informar cpf**
   - Simula um clique no botão de acesso sem preencher o campo CPF.

- **Validar link para Central de Ajuda**
   - Verifica se o link da Central de Ajuda está redirecionando para a pagina correta.

## Bibliotecas Utilizadas

O projeto utiliza as seguintes bibliotecas e ferramentas:

- **Cypress**: Ferramenta de testes end-to-end (E2E).
- **Allure Report**: Para geração de relatórios interativos dos testes.
- **ESLint**: Linter para garantir a qualidade do código.
- **Prettier**: Formatação automática de código.
- **Husky**: Para configurar hooks no Git (como `pre-commit` e `commit-msg`).
- **Commitlint**: Para garantir que as mensagens de commit sigam um padrão.
- **Lint-staged**: Para rodar o ESLint e o Prettier apenas nos arquivos staged antes do commit.
- **Mocha-Allure-Reporter**: Para integração do Cypress com o Allure Report.

## Hooks do Git

O projeto usa o **Husky** para garantir que certos comandos sejam executados durante o fluxo do Git:

- **pre-commit**: Antes de cada commit, o código é analisado pelo ESLint e Prettier.
- **commit-msg**: Verifica se a mensagem do commit segue o padrão de convenção especificado (usando o Commitlint).

#### Desenvolvido por: [**Júlio Marques**](https://www.linkedin.com/in/julio-marques/)
