import { Router } from "express";
import { getProdutos, createProduto, deleteProduto, getProdutoById, updateProduto } from "../controllers/produtoController";

const router = Router();

router.get("/produtos", getProdutos);
router.get("/produtos/:id", getProdutoById);
router.post("/produtos", createProduto);
router.put("/produtos", updateProduto);
router.delete("/produtos/:id", deleteProduto);

export default router;


