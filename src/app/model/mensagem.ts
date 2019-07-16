export class Mensagem{

    data : string;
    de : string;
    para : string;
    mensagem : string;

    constructor(){}

    setDados(obj : any){
        //this.data = obj.data;
        this.data = obj.mensagem;
        this.de = obj.de;
        this.para = obj.para;
        this.mensagem = obj.mensagem;
    }
}