import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  });

  constructor() { }

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const loading = await this.utilsService.loading();

      loading.present()

      this.firebaseService.sendRecoveryEmail(this.form.value.email)
        .then(resp => {

          this.utilsService.presentToast({
            //'message': error.message,
            'message': 'Rebice para cambiar la contraseña.',
            'duration':1500,
            'color': 'primary',
            'position': 'bottom',
            'icon': 'mail-outline'
          })

          this.utilsService.routerLink('/auth')
          this.form.reset()

        }).catch(error => {
          console.log(error)
          this.utilsService.presentToast({
            //'message': error.message,
            'message': 'Error de credenciales',
            'duration':2500,
            'color': 'danger',
            'position': 'bottom',
            'icon': 'alert-circle-outline'
          })
        }).finally(() => {
          loading.dismiss();
        });;
      console.log(this.form.value);
    }
    else{
      console.log('Ocurrio un problema');
    }
  }
}
