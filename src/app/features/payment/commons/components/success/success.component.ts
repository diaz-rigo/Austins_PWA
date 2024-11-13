import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StorageService } from 'src/app/core/services/storage.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-success-form',
  templateUrl: './success.component.html',
  styleUrls: [
    './success.component.scss',
    './scce.scss'
  ]
})
export class SuccessComponent {
  authToken!: string;
  token: string = '';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private orderService: OrderService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Lógica adicional si es necesario
      }
    });
  }

  ngOnInit(): void {
    // Verificar si la URL actual es la de éxito
    if (window.location.pathname === '/payment/order-success') {
      this.token = this.route.snapshot.queryParamMap.get('token') || '';
      console.log(this.token);

      // Añadir un retraso antes de actualizar el estado del pedido
      setTimeout(() => {
        navigator.serviceWorker.ready.then((registration) => {
          registration.pushManager.getSubscription().then((subscription) => {
            if (subscription) {
              const p256dhKey = subscription.getKey('p256dh');
              const authKey = subscription.getKey('auth');

              if (!p256dhKey || !authKey) {
                console.error(
                  'Las claves p256dh o auth están ausentes en la suscripción.'
                );
                return;
              }

              // Convertir las claves a formato base64
              const subObj = {
                endpoint: subscription.endpoint,
                keys: {
                  p256dh: this.arrayBufferToBase64(p256dhKey),
                  auth: this.arrayBufferToBase64(authKey),
                },
              };

              // Llamar al servicio para actualizar el estado del pedido y enviar la suscripción
              this.orderService.updateOrderStatus(this.token, subObj).subscribe(
                (response) => {
                  // Vaciar el carrito y los datos de compra en el localStorage
                  localStorage.removeItem('carrito');
                  localStorage.removeItem('purchaseData');
                  console.log('Carrito y datos de compra vaciados.');

                  // Cualquier otra acción después de actualizar el estado del pedido
                },
                (error) => {
                  console.error('Error al actualizar el estado del pedido:', error);
                }
              );
            } else {
              console.error('La suscripción no está disponible.');
            }
          });
        });
      }, 3000); // Espera de 3 segundos (3000 ms) antes de la actualización
    }
  }

  // Función para convertir un ArrayBuffer a base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
