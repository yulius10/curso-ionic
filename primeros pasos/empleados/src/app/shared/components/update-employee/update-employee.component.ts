import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employees } from 'src/app/models/employees.models';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent  implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  @Input() employee: Employees;

  user = {} as User;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required]),
    salario: new FormControl(null,[Validators.required,Validators.min(0)]),
    cargo: new FormControl('',[Validators.required]),
    plantel: new FormControl('',[Validators.required])
  });

  ngOnInit() {
    this.user = this.utilsService.getLocalStorage('user');

    if(this.employee) this.form.setValue(this.employee)
  }

  setNumberInput(){
    let { salario } = this.form.controls;
    if(salario.value) salario.setValue(parseFloat(salario.value));
  }

  async submit(){
    console.log(this.form.value);
    if(this.form.valid){
      if(this.employee) this.updateEmployee();
      else this.createEmployee();
    }
  }

  async getUserInfo(uid: string){
    if(this.form.valid){
      const loading = await this.utilsService.loading();

      await loading.present()

      let path = `users/${uid}` 

      this.firebaseService.getDocument(path)
        .then((user: User) => {
          
          this.utilsService.saveLocalStorage('user',user)
          this.utilsService.routerLink('/main/home');
          
          this.form.reset();
          
          this.utilsService.presentToast({
            //'message': error.message,
            'message': `Bienvenido ${user.name}`,
            'duration':1500,
            'color': 'primary',
            'position': 'bottom',
            'icon': 'person-circle-outline'
          })

        }).catch(error => {
          console.log(error)
          this.utilsService.presentToast({
            'message': error.message,
            //'message': 'Erro',
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

  async createEmployee(){
    let path = `users/${this.user.uid}/empleados`;

    const loading = await this.utilsService.loading();
    await loading.present();

    let dataUrl = this.form.value.img;
    let imgPath = `${this.user.uid}/${Date.now()}`
    let imgUrl = await this.firebaseService.updateImg(imgPath,dataUrl);
    
    this.form.controls.img.setValue(imgUrl);

    delete this.form.value.id;

    this.firebaseService.addDocument(path,this.form.value)
      .then( async resp => {

        this.utilsService.dismissModal({success: true});

        this.utilsService.presentToast({
          //'message': error.message,
          'message': `Empleado creado exitósamente`,
          'duration':1500,
          'color': 'primary',
          'position': 'bottom',
          'icon': 'checkmark-circle-outline'
        })

      }).catch(error => {
        console.log(error)
        this.utilsService.presentToast({
          'message': error.message,
          //'message': 'Erro',
          'duration':2500,
          'color': 'danger',
          'position': 'bottom',
          'icon': 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      });
  }

  async updateEmployee(){
    console.log('Listo para actualizar');
    let path = `users/${this.user.uid}/empleados/${this.employee.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();

    if(this.form.value.img !== this.employee.img){
      let dataUrl = this.form.value.img;
      let imgPath = await this.firebaseService.getFilePath(this.employee.img);
      let imgUrl = await this.firebaseService.updateImg(imgPath,dataUrl);

      this.form.controls.img.setValue(imgUrl);
    }

    delete this.form.value.id;

    this.firebaseService.updateDocument(path,this.form.value)
      .then( async resp => {

        this.utilsService.dismissModal({success: true});

        this.utilsService.presentToast({
          //'message': error.message,
          'message': `Empleado actualizado exitósamente`,
          'duration':1500,
          'color': 'primary',
          'position': 'bottom',
          'icon': 'checkmark-circle-outline'
        })

      }).catch(error => {
        console.log(error)
        this.utilsService.presentToast({
          'message': error.message,
          //'message': 'Erro',
          'duration':2500,
          'color': 'danger',
          'position': 'bottom',
          'icon': 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      });
  }

  

  async takeImage(){
    const dataUrl = (await this.utilsService.takePicture('Imagen del empleado')).dataUrl //extraer respuesta
    this.form.controls.img.setValue(dataUrl);
  }


}
