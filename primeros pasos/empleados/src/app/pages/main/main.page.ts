import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  router = inject(Router);
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  currentPath: string = '';

  pages = [
    { title: 'Inicio',url: '/main/home',icon:'home-outline' },
    { title: 'Perfil',url: '/main/profile',icon:'person-outline' }
  ]

  ngOnInit() {
    this.router.events.subscribe((events: any) => {
      if(events?.url) this.currentPath = events.url
    })

    console.log(this.pages)
  }

  signOut(){
    this.firebaseService.singOut();
  }

  user(): User {
    return this.utilsService.getLocalStorage('user');
  }
}
