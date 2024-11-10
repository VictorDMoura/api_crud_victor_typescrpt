import { Request, Response } from "express";
import { Produto } from "../models/produtoModel";
import { ProdutoService } from "../services/produtoService";

const produtoService = new ProdutoService();

export const getProdutos = (req: Request, res: Response) => {
    res.json(produtoService.getAll());
}

export const getProdutoById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const produto = produtoService.getById(id);
    if(produto) {
        res.json(produto);
    } else {
        res.status(404).send("Produto não encontrado");
    }
}

export const createProduto = (req: Request, res: Response) => {
    const produto = req.body as Produto;
    const newProduto = produtoService.create(produto);
    res.status(201).json(newProduto);
}

export const updateProduto = (req: Request, res: Response) => {
    const produto = req.body as Produto;
    const updatedProduto = produtoService.update(produto);
    if(updatedProduto) {
        res.json(updatedProduto);
    } else {
        res.status(404).send("Produto não encontrado");
    }
}

export const deleteProduto = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deleted = produtoService.delete(id);
    if(deleted) {
        res.status(204).send();
    } else {
        res.status(404).send("Produto não encontrado");
    }
}