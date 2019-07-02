export class Mensagem{

    data : string;
    idUsuario : string;
    mensagem : string;

    constructor(){}

    setDados(obj : any){
        //this.data = obj.data;
        this.mensagem = obj.mensagem;
    }
}