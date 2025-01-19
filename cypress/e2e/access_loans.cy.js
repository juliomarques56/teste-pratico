// Importa os dados de teste do arquivo JSON, que serão usados para validar informações na página.
import testData from '../fixtures/testData.json';

// Importa os seletores utilizados nas páginas "Meus Empréstimos" e "Central de Ajuda", renomeando-os para facilitar o uso.
import {
  loanPageSelectors as loanPgSel,
  supportPageSelectors as supportPgSel,
} from '../support/selectors/loanPageSelectors';

// Importa dados de resoluções de tela para que os testes possam ser executados em diferentes tamanhos de viewport.
const resolutionsData = require('../fixtures/resolutions.json');
const resolutions = resolutionsData.resolutions;

// Descreve o conjunto de testes para a validação da página "Meus Empréstimos".
describe('Validação da pagina meus emprestimos', () => {
  // Antes de cada teste, garante que a página "Meus Empréstimos" será visitada.
  beforeEach(() => {
    cy.visitLoanPage();
  });

  // Itera por cada resolução de tela definida no arquivo de dados.
  resolutions.forEach((resolution) => {
    // Cria um contexto de teste para cada resolução.
    context(`Teste em resolução ${resolution.id}`, () => {
      // Antes de cada teste, ajusta o tamanho do viewport para a resolução atual.
      beforeEach(() => {
        cy.viewport(resolution.width, resolution.height);
      });

      it('Validar conteúdo inicial da página de empréstimos', () => {
        // Valida se os textos esperados estão presentes nos elementos da página.
        cy.validatePageContent(loanPgSel.pageTitle, testData.pageTitle);
        cy.validatePageContent(loanPgSel.pageSubtitle, testData.pageSubtitle);
        cy.validatePageContent(
          loanPgSel.cpfInstruction,
          testData.cpfInstruction,
        );
        cy.validatePageContent(
          loanPgSel.helpCenterText,
          testData.helpCenterText,
        );

        // Verifica se o botão de acesso está visível.
        cy.isVisible(loanPgSel.accessButton);

        // Se a resolução não for mobile, verifica se a imagem está visível.
        if (resolution.id !== 'mobile') {
          cy.isVisible(loanPgSel.image);
        }

        // Realiza um screenshot do conteúdo inicial da página.
        cy.customScreenshot('conteudo-pagina-login', resolution);
      });

      it('Validar mensagem de erro ao informar CPF inválido', () => {
        // Digita um CPF inválido no campo e valida a mensagem de erro exibida.
        cy.typeText(loanPgSel.cpfField, '99999999999');
        cy.validateErrorMessage(
          loanPgSel.errorMessage,
          testData.invalidCpfError,
        );

        // Realiza um screenshot do erro exibido.
        cy.customScreenshot('mensagem-cpf-invalido', resolution);
      });

      it('Validar mensagem de erro para campo CPF obrigatório', () => {
        // Simula um clique no campo CPF e no botão de acesso sem preencher o CPF.
        cy.clickElement(loanPgSel.cpfField);
        cy.clickElement(loanPgSel.accessButton);

        // Valida a mensagem de erro indicando que o campo é obrigatório.
        cy.validateErrorMessage(
          loanPgSel.errorMessage,
          testData.requiredFieldError,
        );

        // Realiza um screenshot do erro exibido.
        cy.customScreenshot('mensagem-campo-obrigatorio', resolution);
      });

      it('Validar alteração do contorno do campo cpf ao clicar em Acessar sem informar cpf', () => {
        // Simula um clique no botão de acesso sem preencher o campo CPF.
        cy.clickElement(loanPgSel.accessButton);

        // Verifica se o contorno do campo CPF apresenta a classe que indica erro.
        cy.get(loanPgSel.outline).should(
          'have.class',
          'mat-form-field-invalid',
        );

        // Realiza um screenshot do campo com o contorno alterado.
        cy.customScreenshot('contorno-campo-cpf-obrigatorio', resolution);
      });

      it('Verificar link para Central de Ajuda', () => {
        // Clica no link da Central de Ajuda.
        cy.clickElement(loanPgSel.helpCenterLink);

        // Valida a navegação para o domínio correto e interage com a nova página.
        cy.origin(
          'https://picpay.com',
          { args: { supportPgSel, resolution } },
          ({ supportPgSel, resolution }) => {
            // Aceita os cookies e valida a URL da página de atendimento.
            cy.get(supportPgSel.acceptCookies).click();
            cy.url().should('include', '/canais-de-atendimento');

            // Realiza um screenshot da página de atendimento.
            cy.screenshot(
              `pagina-central-ajuda_${resolution.width}x${resolution.height}`,
            );
          },
        );
      });
    });
  });
});
