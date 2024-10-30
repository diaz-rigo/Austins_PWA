import { ProductComponent } from 'src/app/features/portal/commons/components/product/product.component';
import { mount } from 'cypress/angular';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/core/services/cart.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { SidebarServiceService } from 'src/app/shared/services/sidebar-service.service';
import { SearchService } from 'src/app/shared/services/search-service.service';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { Product } from 'src/app/features/admin/models/Product.models';

describe('ProductComponent.cy.ts', () => {
  it('should mount the product component with product data', () => {
    const mockProduct: Partial<Product> = {
      _id: '123',
      name: 'Sample Product',
      price: 25.0,
      images: ['sample-image.jpg'],
      description: 'This is a sample product description that is fairly long.'
    };

    mount(ProductComponent, {
      imports: [CommonModule, RouterTestingModule],
      providers: [CartService, StorageService, SidebarServiceService, SearchService, HeaderComponent],
      componentProperties: {
        product: mockProduct as Product
      }
    });

    // Verificar que el nombre del producto se muestra correctamente
    cy.get('.product-name').should('contain', 'Sample Product');

    // Verificar que el precio del producto se muestra correctamente
    cy.get('.product-price').should('contain', '$25.00'); // Ajusta el formato según tu configuración regional

    // Verificar que la descripción se muestra correctamente
    cy.get('.product-description').should('contain', 'This is a sample product description');

    // Verificar que la imagen se carga correctamente
    cy.get('.product-image')
      .should('have.attr', 'src')
      .and('include', 'sample-image.jpg');
  });

  it('should add product to cart and show sidebar', () => {
    const mockProduct: Partial<Product> = {
      _id: '123',
      name: 'Sample Product',
      price: 25.0,
      images: ['sample-image.jpg'],
      description: 'This is a sample product description.'
    };

    mount(ProductComponent, {
      imports: [CommonModule, RouterTestingModule],
      providers: [CartService, StorageService, SidebarServiceService, SearchService, HeaderComponent],
      componentProperties: {
        product: mockProduct as Product
      }
    });

    // Simular clic en el botón de agregar al carrito
    cy.get('.add-to-cart-button').click();

    // Verificar que el sidebar se muestra
    cy.get('.sidebar-selector').should('be.visible'); // Cambia '.sidebar-selector' por el selector real de tu sidebar

    // Esperar a que el sidebar desaparezca después de 3 segundos
    cy.wait(3000);
    cy.get('.sidebar-selector').should('not.be.visible'); // Cambia por el selector real
  });
});
