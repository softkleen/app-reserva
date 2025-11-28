import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, AlertController, IonItem,  IonLabel, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.page.html',
  styleUrls: ['./reservas-list.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ReservasListPage implements OnInit {

  reservas: any[]=[];

  constructor(private router: Router, private alertCtrl: AlertController) { }

ionViewWillEnter(){ // hook de ciclo de vida do Ionic = evento no C# (Load)
  this.loadReservas();
}

loadReservas(){
  const data = localStorage.getItem('reservas'); // obter item
  this.reservas = data ? JSON.parse(data) : [];
}

editar(id: number){
  this.router.navigate(['/editar-reserva', id]); // $_GET[]
}

async excluir(id: number){
  const alert = await this.alertCtrl.create({
    header: "Excluir Reserva",
    message: "Deseja realmente excluir a reserva?",
    buttons:[
      {text: 'Cancelar', role:'cancel'},
      {
        text: 'Excluir',
        handler: () => {
console.log(this.reservas.findIndex);
          this.reservas = this.reservas.filter(r => r.index !== id)
          localStorage.setItem('reservas', JSON.stringify(this.reservas));
        }
      }
    ]
  });
  await alert.present();
}


  ngOnInit() { // hook  = evento (Click, MouseUp, Load, )
  }

}
