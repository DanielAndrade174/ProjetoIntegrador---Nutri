export class Usuario{

    id : string;
    nome : string;
    endereco : string;
    telefone : string;
    email : string;
    senha : string;
    imagem : string;

    constructor(){   
    }

    // Dados do firebase
    setDados(obj : any){
        this.nome = obj.nome;
        this.endereco = obj.endereco;
        this.telefone = obj.telefone;
        this.email = obj.email;
        this.senha = obj.senha;
    }
}