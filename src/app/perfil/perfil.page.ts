import { Component, OnInit } from '@angular/core';
import { Nutricionista } from '../model/nutricionista';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nutriEmail: string;
  id: string;
  perfilN: Nutricionista = new Nutricionista();
  picture: string = "../../assets/imagens/1.gif";

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true }


  constructor(public activatedRoute: ActivatedRoute,
    public firebaseauth: AngularFireAuth,
    public router: Router,
    public fire: AngularFireAuth) {

    this.id = this.activatedRoute.snapshot.paramMap.get('nutricionista');

    this.firebaseauth.authState.subscribe(obj => {

      this.id = this.firebaseauth.auth.currentUser.uid;
      this.nutriEmail = this.firebaseauth.auth.currentUser.email;

      this.downloadFoto();

      let ref = this.firestore.collection('nutricionista').doc(this.id)
      ref.get().then(doc => {
        this.perfilN.setDados(doc.data());
        this.perfilN.id = doc.id;
        console.log(this.perfilN);

      }).catch(err => {
        console.log(err)
      });

    });
  }

  ngOnInit() {

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`perfil/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.picture = url;
    })
  }

  deslogar() {
    this.fire.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    }).catch(() => {
      this.router.navigate(['/list']);
    })
  }

  edt() {
    this.router.navigate(['perfil-view']);
  }

  Home() {
    this.router.navigate(['/list']);
  }

}