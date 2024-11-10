import { Fornecedor } from "../models/fornecedorModel";
import { FornecedorRepository } from "../repositories/fornecedorRepository";


interface IService<T> {
    getAll(): T[];
    getById(id: number): T | undefined;
}

export class FornecedorService implements IService<Fornecedor> {
    private repository: FornecedorRepository;

    constructor() {
        this.repository = new FornecedorRepository();
    }

    getAll(): Fornecedor[] {
        return this.repository.getAll();
    }

    getById(id: number): Fornecedor | undefined {
        return this.repository.getById(id);
    }

}