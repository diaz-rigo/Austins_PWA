
import './commands'
describe('Detalle de Producto', () => {
  it('Debería mostrar la información del producto correctamente', () => {
    // Visita la URL específica del producto
    cy.visit('http://localhost:4200/portal/detail/65e8244b8811e29da1794ff0');

    // Verifica que el título del producto esté visible
    cy.get('.product-title') // Cambia el selector según la clase o id de tu título de producto
      .should('be.visible')
      .and('contain', 'Nombre del Producto'); // Cambia "Nombre del Producto" por el título esperado

    // Verifica que el precio esté presente
    cy.get('.product-price') // Cambia el selector según el precio del producto
      .should('be.visible')
      .and('contain', '$'); // Ajusta el valor esperado o símbolo de moneda según corresponda

    // Verifica que la descripción esté visible
    cy.get('.product-description') // Cambia el selector según la descripción del producto
      .should('be.visible')
      .and('not.be.empty'); // Asegúrate de que la descripción no esté vacía

    // Puedes agregar más verificaciones según los elementos que se esperen en la página
  });
});
