import { Produto } from "../models/produtoModel";


export class ProdutoRepository {
    private produtos: Produto[] = [
        { id: 1, nome: "Tijolo", qtdeEstoque: 100, preco: 0.90 },
        { id: 2, nome: "Product 2", qtdeEstoque: 200 , preco: 25.00 },
    ];


    getAll(): Produto[] {
        return this.produtos;
    }

    getById(id: number): Produto | undefined {
        return this.produtos.find((produto) => produto.id === id);
    }

    create(produto: Produto): Produto {
        this.produtos.push(produto);
        return produto;
    }

    update(produto: Produto): Produto | undefined {
        const index = this.produtos.findIndex((p) => p.id === produto.id);
        if(index !== -1) {
            this.produtos[index] = produto;
            return produto;
        }
        return undefined;
    }

    delete(id: number): boolean {
        const index = this.produtos.findIndex((produto) => produto.id === id);
        if(index !== -1) {
            this.produtos.splice(index, 1);
            return true;
        }
        return false;
    }
}