describe('Register and login', () => {
  
  const cliente = {
    dni: '12345678',
    nombreYApellido: 'Test',
    telefono: '123456789',
    direccion: 'Test 123',
    email: 'test@test.com',
    usuario: 'testuser',
    password: 'Testuser123!'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should register a new Cliente', () => {
    cy.contains('Registrar Nuevo Cliente').click(); 

    cy.get('input[formControlName="dni"]').type(cliente.dni);
    cy.get('input[formControlName="nombreYApellido"]').type(cliente.nombreYApellido);
    cy.get('input[formControlName="telefono"]').type(cliente.telefono);
    cy.get('input[formControlName="direccion"]').type(cliente.direccion);
    cy.get('input[formControlName="email"]').type(cliente.email);
    cy.get('input[formControlName="usuario"]').type(cliente.usuario);
    cy.get('input[formControlName="password"]').type(cliente.password);

    cy.contains('Confirmar').click();

    cy.get('.p-toast-message').should('contain', 'Cliente registrado correctamente');
  });

  it('should log in and add a new Animal', () => {

    cy.get('#username').type(cliente.usuario);
    cy.get('#password').type(cliente.password);
    
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/home'); 

    cy.wait(250);

    cy.contains('MASCOTAS').click();
    cy.url().should('include', '/mascotas');

    cy.contains('Nuevo').click();

    cy.get('p-dialog').should('be.visible');

    cy.get('input[formControlName="nombre"]').type('Test Animal');
    cy.get('input[formControlName="fechaNac"]').type('2020-01-01');

    cy.get('select[formControlName="idEspecie"]').select('1');

    cy.get('select[formControlName="idRaza"]').should('not.be.empty');
    cy.wait(250);
    cy.get('select[formControlName="idRaza"]').select('1');

    cy.contains('Confirmar').click();

    cy.get('.p-toast-message').should('contain', 'Mascota creada correctamente');

    cy.contains('Test Animal').should('exist');
  });

});
