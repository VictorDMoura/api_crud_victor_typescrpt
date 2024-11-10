import { Request, Response } from "express";
import { Fornecedor } from "../models/fornecedorModel";
import { FornecedorService } from "../services/fornecedorService";

const fornecedorService = new FornecedorService();

export const getFornecedores = (req: Request, res: Response) => {
    res.json(fornecedorService.getAll());
}

export const getFornecedorById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const fornecedor = fornecedorService.getById(id);
    if(fornecedor) {
        res.json(fornecedor);
    } else {
        res.status(404).send("Fornecedor não encontrado");
    }

}