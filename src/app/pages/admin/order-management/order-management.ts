import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/order.model';
import {OrderService} from '../../../core/services/order';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.html',
  styleUrls: ['./order-management.css']
})
export class OrderManagement {
  private orderService = inject(OrderService);
  orders$ = this.orderService.getAllOrders();

  exportOrderToPDF(order: Order) {
    const doc = new jsPDF();

    // Ajout du titre et des informations générales
    doc.setFontSize(18);
    doc.text('Bon de Commande Driv\'n Cook', 14, 22);
    doc.setFontSize(11);
    doc.text(`Commande #: ${order.id.substring(0, 8)}`, 14, 32);
    doc.text(`Date: ${order.date.toDate().toLocaleDateString('fr-FR')}`, 14, 38);

    // Informations sur le franchisé et l'entrepôt
    doc.text(`Franchisé: ${order.franchiseName}`, 14, 48);
    doc.text(`Entrepôt de retrait: ${order.warehouseName}`, 14, 54);

    // Utilisation de jspdf-autotable pour créer un tableau des articles
    autoTable(doc, {
      startY: 65,
      head: [['Produit', 'Quantité', 'Prix Unitaire', 'Total Ligne']],
      body: order.items.map(item => [
        item.productName,
        item.quantity,
        `${item.unitPrice.toFixed(2)} €`,
        `${(item.quantity * item.unitPrice).toFixed(2)} €`
      ]),
      theme: 'striped',
      headStyles: { fillColor: [38, 50, 56] }
    });

    // Calcul de la position pour afficher le total
    const finalY = (doc as any).lastAutoTable.finalY;

    // Affichage du total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total de la commande: ${order.totalPrice.toFixed(2)} €`, 14, finalY + 15);

    // Sauvegarde du fichier PDF
    doc.save(`commande_${order.id.substring(0, 8)}.pdf`);
  }
}
