export interface Produto {
    id: number;
    nome: string;
    qtdeEstoque: number;
    preco: number;
    _idFornFK: number;
}