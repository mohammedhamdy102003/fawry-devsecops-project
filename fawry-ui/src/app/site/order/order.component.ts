import { Component, DestroyRef, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { Order } from '../../core/interfaces/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;
  orders = signal<Order[]>([]);
  constructor(private _OrderService: OrderService, private _DestroyRef: DestroyRef) { }
  customerId = signal<string>(`${localStorage.getItem('customer')}`);
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    const sub = this._OrderService.myOrders(this.customerId()).subscribe({
      next: (res: any) => {
        console.log(res);
        this.orders.set(res.data);
      }
    });
    this._DestroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }
  getTotalWeight(items: any[]): number {
    return items.reduce((acc, item) => acc + (item.product.weight * item.quantity), 0);
  }

  printReceipt() {
    const content = this.printSection.nativeElement.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body { font-family: monospace; padding: 20px; white-space: pre; }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }
}
