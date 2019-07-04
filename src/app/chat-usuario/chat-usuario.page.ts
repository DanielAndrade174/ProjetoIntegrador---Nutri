import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Mensagem } from '../model/mensagem';

@Component({
  selector: 'app-usuario-nutri',
  templateUrl: './chat-usuario.page.html',
  styleUrls: ['./chat-usuario.page.scss'],
})
export class ChatUsuarioPage implements OnInit {

  idNutricionista : string;
  idUsuario : string;
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  idUsuarioUser : string; // usuario com quem estou conversando
  conversa : Mensagem[] = [];

  formGroup : FormGroup;
  @ViewChild('txtarea') txtarea;
  

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController,
    public firebaseauth : AngularFireAuth,
    private formBuilder : FormBuilder, ) {

     
      this.idUsuarioUser = this.activatedRoute.snapshot.paramMap.get('usuario');
      console.log("Usuario 1 "+this.idUsuarioUser)

      this.firebaseauth.authState.subscribe(obj=>{
        this.idUsuario = this.firebaseauth.auth.currentUser.uid;
       console.log("Usuario 2"+this.idUsuario)
            
      let ref = this.firestore.doc('mensagem/'+this.idUsuario).collection(this.idUsuarioUser);
        ref.onSnapshot(doc=> {

          doc.docChanges().forEach(c =>{
            let m = new Mensagem();
            m.setDados(c.doc.data());
            this.conversa.push(m);
          })

        
        });

  
      });

    }

  ngOnInit() {

  }



  atualiza(){
    let ref = this.firestore.doc('mensagem/'+this.idUsuario).collection(this.idUsuarioUser);
    ref.get().then(doc =>{
      doc.forEach(c=>{
        
       let m = new Mensagem();
        m.setDados(c.data());
        this.conversa.push(m);
        
      })
      
    })


  }

  enviarMensagem(){

    this.formGroup = this.formBuilder.group({
      data : [ new Date()],
      mensagem : [this.txtarea.value]
   });


   let ref = this.firestore.doc('mensagem/'+this.idUsuario).collection(this.idUsuarioUser).add(this.formGroup.value)
   .then(resp=>{
      console.log('Cadastrado com sucesso');
      this.firestore.doc('mensagem/'+this.idUsuarioUser).collection(this.idUsuario).add(this.formGroup.value)
      
   .then(resp=>{
      console.log('Cadastrado com sucesso');
    }).catch(function(){
      console.log('Erro ao cadastrar');
    })

    }).catch(function(){
      console.log('Erro ao cadastrar');
    })

  }

  Home() {
    this.router.navigate(['/lista-de-usuarios']);
  }

}
