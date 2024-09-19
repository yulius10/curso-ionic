import { Injectable, inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail  } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import {  addDoc, collection, doc, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsService = inject(UtilsService);

  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  
  updateUser(displayName: any ){
    return updateProfile(getAuth().currentUser,{displayName})
  }

  setDocument(path:any, data:any){
    return setDoc(doc(getFirestore(),path),data);
  }

  async getDocument(path:any){
    return (await getDoc(doc(getFirestore(),path))).data();
  }

  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(),email);
  }

  singOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsService.routerLink('/auth');
  }

  addDocument(path:any,data:any){ //user/iud/empleados
    return addDoc(collection(getFirestore(),path),data); //guarda los datos
  }

  async updateImg(path:any,data_url:any){
    return uploadString(ref(getStorage(),path),data_url,'data_url')
      .then(() => {
        return getDownloadURL(ref(getStorage(),path));
      });
  }
}
