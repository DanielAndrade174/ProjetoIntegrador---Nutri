import { Component, OnInit } from '@angular/core';
import { Nutricionista } from '../model/nutricionista';
import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.page.html',
  styleUrls: ['./lista-de-usuarios.page.scss'],
})
export class ListaDeUsuariosPage implements OnInit {
  listaDeUsuarios: Usuarios[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  constructor(public router: Router, public loadingController: LoadingController) {

  }

  ngOnInit() {
    this.getList();
  }

  viewUsuario(obj: Usuarios) {
    this.router.navigate(['/usuario-view', { 'usuario': obj.id }]);
    this.presentLoading();
  }

  Chat() {
    this.router.navigate(['/chat-nutri']);
  }

  perfilNutri(obj: Usuario) {
    this.router.navigate(['/perfil-usuario', { 'usuario': obj.id }]);
  }

  getList() {
    var ref = firebase.firestore().collection("usuario");
    ref.get().then(query => {
      query.forEach(doc => {
        let c = new Usuario();
        c.setDados(doc.data());
        c.id = doc.id;
        this.listaDeUsuarios.push(c);
      });
    });
  }


  remove(obj: Usuario) {
    var ref = firebase.firestore().collection("usuario");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeUsuarios = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
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
