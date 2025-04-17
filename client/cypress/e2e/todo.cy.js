describe('Testes da Aplicação TODO', () => {
    // Executa antes de cada teste
    beforeEach(() => {
      cy.visit('http://localhost:3000'); // URL do frontend
    });
  
    // Teste 1: Adicionar um novo TODO
    it('Deve adicionar um novo TODO', () => {
      // Digita no input e pressiona Enter
      cy.get('input[placeholder="Nova tarefa..."]')
        .type('Estudar Cypress')
        .type('{enter}');
  
      // Verifica se o TODO aparece na lista
      cy.contains('Estudar Cypress').should('exist');
    });
  
    // Teste 2: Marcar TODO como concluído
    it('Deve marcar um TODO como concluído', () => {
      // Adiciona um TODO
      cy.get('input[placeholder="Nova tarefa..."]')
        .type('Teste de conclusão')
        .type('{enter}');
  
      // Clica no texto para marcar como concluído
      cy.contains('Teste de conclusão')
        .click()
        .should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)'); // Estilo aplicado
    });
  
    // Teste 3: Excluir um TODO
    it('Deve excluir um TODO', () => {
      // Adiciona um TODO
      cy.get('input[placeholder="Nova tarefa..."]')
        .type('TODO para excluir')
        .type('{enter}');
  
      // Clica no botão de lixeira (ajuste o seletor conforme seu código)
      cy.contains('TODO para excluir')
        .parent() // Navega até o elemento pai (li)
        .find('button') // Encontra o botão de exclusão
        .click();
  
      // Verifica se o TODO foi removido
      cy.contains('TODO para excluir').should('not.exist');
    });
  });