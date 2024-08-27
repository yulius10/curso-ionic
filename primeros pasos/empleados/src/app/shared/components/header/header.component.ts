import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string; 
  @Input() showMenu!: boolean; 
  @Input() backButton!: string; 


  constructor() { }

  ngOnInit() {}

}
