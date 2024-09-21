import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Employees } from 'src/app/models/employees.models';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-employee/update-employee.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);


  loading:boolean = false;

  employees : Employees[] = [];


  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getEmployee();
  }

  async addUpdateEmployees(employee?: Employees){
    let modal = await this.utilsService.getModal({
      component: UpdateEmployeeComponent,
      cssClass: 'add-update-modal',
      componentProps: { employee }
    });

    if(modal) this.getEmployee()
  }

  user():User{
    return this.utilsService.getLocalStorage('user');
  }

  getEmployee(){
    let path = `users/${this.user().uid}/empleados`;
    console.log(this.user().uid)

    this.loading = true;

    let sub = this.firebaseService.getCollectionData(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        })))
      ).subscribe({
        next: (resp: any) => {
          this.employees = resp;
          console.log(this.employees)
          this.loading = false;
          sub.unsubscribe();
        }
      });
  }


  doRefresh(event: any){
    setTimeout(() => {
      this.getEmployee();
      event.target.complete();
    },1000);
  }
}
