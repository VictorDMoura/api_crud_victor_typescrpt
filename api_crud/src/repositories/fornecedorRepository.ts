import {Fornecedor} from '../models/fornecedorModel';


export class FornecedorRepository{
    private fornecedores: Fornecedor[] = [
        { id: 1, nome:" Mundo da Construção" },
        { id: 2, nome: "Cimento & Cia" },
    ];

    getAll(): Fornecedor[] {
        return this.fornecedores;
    }

    getById(id: number): Fornecedor | undefined {
        return this.fornecedores.find((fornecedor) => fornecedor.id === id);
    }
}