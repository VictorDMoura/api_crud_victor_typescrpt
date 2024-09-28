export interface Produto {
    id: number;
    nome: string;
    qtdeEstoque: number;
    preco: number;
    idFornFK: number;
}