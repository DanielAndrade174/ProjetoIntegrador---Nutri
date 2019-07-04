import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.page.html',
  styleUrls: ['./lista-de-usuarios.page.scss'],
})
export class ListaDeUsuariosPage implements OnInit {

  listaDeUsuarios: Usuario[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  idList : String[] = [];

  constructor(public router: Router, public loadingController: LoadingController) {
    
   }

 ngOnInit() {
    this.getList();
    
  }

  Chat(usuario : string) {
    this.router.navigate(['/chat-usuario', { 'usuario': usuario }]);
  }

  perfilUsuario(obj: Usuario) {
    this.router.navigate(['/perfil-usuario', { 'usuario': obj.id }]);
  }

  getList() {
    
    var ref = firebase.firestore().collection("mensagem").doc("u90pFy6blISIUlATnzH8Pxqm5c33");
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
