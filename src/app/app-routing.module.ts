import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Auth2Guard } from './service/auth2.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [Auth2Guard]
  },
  { path: 'logoff', 
    loadChildren: './logoff/logoff.module#LogoffPageModule',
    canActivate: [Auth2Guard] 
  },
  { path: 'nutricionista-view', loadChildren: './nutricionista-view/nutricionista-view.module#NutricionistaViewPageModule' },
  { path: 'perfil-nutri', loadChildren: './perfil-nutri/perfil-nutri.module#PerfilNutriPageModule' },
  { path: 'lista-de-usuarios', loadChildren: './lista-de-usuarios/lista-de-usuarios.module#ListaDeUsuariosPageModule' },
  { path: 'usuario-view', loadChildren: './usuario-view/usuario-view.module#UsuarioViewPageModule' },
  { path: 'perfil-usuario', loadChildren: './perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
  { path: 'chat-usuario', loadChildren: './chat-usuario/chat-usuario.module#ChatUsuarioPageModule' },  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'perfil-view', loadChildren: './perfil-view/perfil-view.module#PerfilViewPageModule' },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
