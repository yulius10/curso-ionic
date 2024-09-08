import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDrtas4c8KRK7XFaEl9RXySTOQ6eZYM83w",
  authDomain: "empleados-e494a.firebaseapp.com",
  projectId: "empleados-e494a",
  storageBucket: "empleados-e494a.appspot.com",
  messagingSenderId: "1091216936536",
  appId: "1:1091216936536:web:3b61edc82a037cca43442d",
  measurementId: "G-4V2W7J73KM"
};

// Initialize Firebase
initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFirestoreModule,
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
