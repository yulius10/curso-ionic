import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  firebaseService = inject(FirebaseService);

  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  });
  constructor() { }

  ngOnInit() {

  }

  async submit(){
    if(this.form.valid){
      this.firebaseService.signIn(this.form.value as User)
        .then(resp => {
          console.log('__________',resp)
        });
      console.log(this.form.value);
    }
    else{
      console.log('Ocurrio un problema');
    }
  }

}
