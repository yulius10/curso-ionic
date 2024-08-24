import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  router = inject(Router)
  currentPath: string = ''

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

}
