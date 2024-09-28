import {Produto} from '../models/produtoModel';
import {ProdutoRepository} from '../repositories/produtoRepository';

interface IService<T> {
    getAll(): T[];
    getById(id: number): T | undefined;
    create(item: T): T;
    update(item: T): T | undefined;
    delete(id: number): boolean;
}


export class ProdutoService implements IService<Produto> {
    private repository: ProdutoRepository;

    constructor() {
        this.repository = new ProdutoRepository();
    }

    getAll(): Produto[] {
        return this.repository.getAll();
    }

    getById(id: number): Produto | undefined {
        return this.repository.getById(id);
    }

    create(item: Produto): Produto {
        return this.repository.create(item);
    }

    update(item: Produto): Produto | undefined {
        return this.repository.update(item);
    }

    delete(id: number): boolean {
        return this.repository.delete(id);
    }
}