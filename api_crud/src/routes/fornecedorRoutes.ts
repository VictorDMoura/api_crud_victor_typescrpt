import { Router } from "express";
import { getFornecedores, getFornecedorById } from "../controllers/fornecedorController";

const router = Router();

router.get("/fornecedores", getFornecedores);
router.get("/fornecedores/:id", getFornecedorById);

export default router;