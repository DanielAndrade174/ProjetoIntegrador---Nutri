import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Mensagem } from '../model/mensagem';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.page.html',
  styleUrls: ['./lista-de-usuarios.page.scss'],
})
export class ListaDeUsuariosPage implements OnInit {

  @ViewChild("textoBusca") textoBusca;

  idUsuario : string;
  listaDeUsuarios: Mensagem[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  filtroBox = 'none'

  idList : String[] = [];

  constructor(public firebaseauth : AngularFireAuth,public router: Router, public loadingController: LoadingController) {
    
    this.firebaseauth.authState.subscribe(obj=>{
      this.idUsuario = this.firebaseauth.auth.currentUser.uid;
     console.log("Usuario 2 "+this.idUsuario)
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
    
    var ref = firebase.firestore().collection("nutricionista").doc(this.idUsuario).collection('mensagem');
    ref.get().then(doc => {

      let add = true;
      
       doc.forEach(item=>{

        this.listaDeUsuarios.forEach(i=>{

          if(i.de == item.data().de || i.de == this.idUsuario)
          add = false;

        });


         let u = new Mensagem();
          u.de = item.data().de;

          if(add == true)
          this.listaDeUsuarios.push(u);
       });


       console.log(this.listaDeUsuarios);
       });
  
   
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

  /*
  busca() {
    this.listaDeUsuarios = [];
    var ref = firebase.firestore().collection("mensagens");
    //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {
    ref.orderBy('nome').startAfter(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {

      if (doc.size > 0) {

        doc.forEach(doc => {

          let p = new Usuario();
          p.setDados(doc.data());
          p.id = doc.id;
          this.listaDeUsuarios.push(p);

        });


      } else {
        this.listaDeUsuarios = [];
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })

    //this.router.navigate(['/Prato', { 'filtro': "busca" }]);
  }
*/
  showFilter(){
    if(this.filtroBox=='none')
      this.filtroBox = 'block'
    else
      this.filtroBox = 'none'
  }
}

