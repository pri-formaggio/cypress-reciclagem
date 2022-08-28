/// <reference types="Cypress" />
// it.only - só roda o teste do caso de teste corrente 

// A option do type usado no exercício 2, {delay: 0}, serve para setarmos um valor menor de delay diferente do default que é 10, 
// isso ajuda na velocidade quando precisamos digitar textos longos


describe('Central de Atendimento ao Cliente TAT', function() {

    const THREE_SECONDS_IN_MILISECONDS = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    // Exercício 1
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTE'
        
        cy.get('#firstName').type('Priscila')
        cy.get('#lastName').type('Formaggio')
        cy.get('#email').type('pribelform@gmail.com')
        cy.get('#phone').type('14997848622')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('span[class="success"]').should('be.visible')
    })

    // Exercício 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Priscila')
        cy.get('#lastName').type('Formaggio')
        cy.get('#email').type('pribelform')
        cy.get('#phone').type('14997848622')
        cy.get('#open-text-area').type('email errado')
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    // Exercício 3
    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone')
            .type('abd')
                .should('have.value', '')
    })

    // Exercício 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Priscila')
        cy.get('#lastName').type('Formaggio')
        cy.get('#email').type('pribelform@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('email errado')
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    // Exercício 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Priscila').should('have.value', 'Priscila').clear().should('have.value', '')
        cy.get('#lastName').type('Formaggio').should('have.value', 'Formaggio').clear().should('have.value', '')
        cy.get('#email').type('pribelform@gmail.com').should('have.value', 'pribelform@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('14997848622').should('have.value', '14997848622').clear().should('have.value', '')
    })

    // Exercício 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    // Exercício 7:
    it('envia o formuário com sucesso usando um comando customizado', function(){
        const user = {
            nome: 'Priscila',
            sobrenome: 'Formaggio',
            email: 'pribelform@gmail.com',
            telefone: '14997848622'
        }
        cy.fillMandatoryFieldsAndSubmit(user.nome, user.sobrenome, user.email, user.telefone)
    })

    // Exercício 8: 
    it('cy.contains', function(){
        cy.get('#firstName').type('Priscila')
        cy.get('#lastName').type('Formaggio')
        cy.get('#email').type('pribelform@gmail.com')
        cy.get('#phone').type('14997848622')
        cy.get('#open-text-area').type('longText')
        cy.contains('button', 'Enviar').click()
        cy.get('span[class="success"]').should('be.visible')
    })

    // Exercicio 9: 
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    // Exercicio 11: 
    it('seleciona um produto (Mentoria) por seu valor', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    // Exercicio 12: 
    it('seleciona um produto (Blog) pelo seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    // Exercício 13: 
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
    })

     // Exercício 14: 
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
                .each(function($radio){
                    cy.wrap($radio).check()
                    cy.wrap($radio).should('be.checked')
                })
    })

    // Exercício 15: 
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
                .last()
                    .uncheck()
                        .should('not.be.checked')
           
    })

    // Exercício 16: 
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', function(){
        cy.get('#firstName').type('Priscila')
        cy.get('#lastName').type('Formaggio')
        cy.get('#email').type('pribelform@gmail.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('email errado')
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
           
    })

    // Exercício 17: 
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

     // Exercício 18: 
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

     // Exercício 19: 
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    // Exercício 20: 
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    // Exercício 21: 
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing')
    })

     // Exercício 22: Congelando o relogio do navegador 
     // para não precisar esperar o tempo de 3 segundos para sumir a mensagem de sucesso
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTE'
        cy.clock()
        cy.get('#firstName').type('Priscila')
        cy.get('#lastName').type('Formaggio')
        cy.get('#email').type('pribelform@gmail.com')
        cy.get('#phone').type('14997848622')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('span[class="success"]').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MILISECONDS)
        cy.get('span[class="success"]').should('not.be.visible')        
    })

    // Exercício 23: Lodash - Cypress.times
    Cypress._.times(3, function(){
        it('preenche os campos obrigatórios e envia o formulário', function(){
            const longText = 'TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE, TESTE'
            cy.clock()
            cy.get('#firstName').type('Priscila')
            cy.get('#lastName').type('Formaggio')
            cy.get('#email').type('pribelform@gmail.com')
            cy.get('#phone').type('14997848622')
            cy.get('#open-text-area').type(longText, {delay: 0})
            cy.get('button[type="submit"]').click()
            cy.get('span[class="success"]').should('be.visible')
            cy.tick(THREE_SECONDS_IN_MILISECONDS)
            cy.get('span[class="success"]').should('not.be.visible')        
        })
    })

    // Exercício 24: Lodash - Cypress.times
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')   
    })
    
    // Exercício 25: 
    it('preenche a area de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    // Exercício 26: 
    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const {status, statusText, body} = response 
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    // Exercício 27: 
    it.only('encontre o gato escondido', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')

        cy.get('#title')
        .invoke('text', 'PRI')
    })

})
  