import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.page.html',
  styleUrls: ['./lista-de-usuarios.page.scss'],
})
export class ListaDeUsuariosPage implements OnInit {
  idUsuario : string;
  listaDeUsuarios: Usuario[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  idList : String[] = [];

  constructor(public firebaseauth : AngularFireAuth,public router: Router, public loadingController: LoadingController) {
    
    this.firebaseauth.authState.subscribe(obj=>{
      this.idUsuario = this.firebaseauth.auth.currentUser.uid;
     console.log("Usuario 2"+this.idUsuario)
     this.getList();
    });
  
   }

 ngOnInit() {
    
    
  }

  Chat(usuario : string) {
    this.router.navigate(['/chat-usuario', { 'usuario': usuario }]);
  }

  perfilUsuario(obj: Usuario) {
    this.router.navigate(['/perfil-usuario', { 'usuario': obj.id }]);
  }

  getList() {
    
    var ref = firebase.firestore().collection("mensagem").doc(this.idUsuario);
    ref.get().then(doc => {

       this.idList.push(doc.id);
        
      }).catch(err=>{
        console.log("erro 1")
      })
   
  }

  Home() {
    this.router.navigate(['/list']);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();


  }


}
