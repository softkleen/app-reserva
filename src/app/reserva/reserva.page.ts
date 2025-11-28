import { routes } from './../app.routes';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, ToastController, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonInput, IonGrid, IonRow, IonCol, IonDatetime, IonSelect, IonSelectOption, IonTextarea, IonFooter, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonTextarea, IonDatetime, IonCol, IonRow, IonGrid, IonInput, IonText, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule, IonMenuButton,
    ReactiveFormsModule, IonSelect, IonSelectOption]
})
export class ReservaPage implements OnInit {

  reservaForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telefone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(11)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    pessoas: new FormControl(2,[Validators.min(1)]),
    preferencia: new FormControl(''),
    ocasiao: new FormControl(''),
    observacoes: new FormControl('')
  });


  constructor(private toastCtrl: ToastController, private router: Router) { }

  async confirmaReserva(){
    if(this.reservaForm.invalid){
      this.mostrarToast('Preencha todos os campos obrigatórios');
      return;
    }
    const novaReserva = {
      ...this.reservaForm.value, 
      criadoEm: new Date().toISOString()
    };

    const reservasSalvas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservasSalvas.push(novaReserva);

    localStorage.setItem('reservas', JSON.stringify(reservasSalvas));
    await this.mostrarToast('Reserva registrada com sucesso!');

    this.reservaForm.reset({
      pessoas: 2
    });
    this.router.navigate(['/reservas-list']);
  }
  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000, // em miléssimos de segundo
      color: 'success',
      position: 'middle'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
