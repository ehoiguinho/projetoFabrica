import express from 'express'
import ProdutoController from '../controller/produtoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let ctrl = new ProdutoController();

router.post("/", authMiddleware, (req, res) =>{

    //#swagger.tags = ['Produtos']
    //#swagger.summary = "Realiza o cadastro de um produto"

    ctrl.cadastrar(req, res);
})

router.get("/", (req, res) =>{

    //#swagger.tags = ['Produtos']
    //#swagger.summary = "Lista todos os produtos cadastrados no sistema"


    ctrl.listar(req, res);
})

router.put("/:id", (req, res) =>{

    //#swagger.tags = ['Produtos']
    //#swagger.summary = "Realiza a alteração de dados de um produto"


    ctrl.alterar(req, res);
})

router.delete("/:id", (req, res) => {

    //#swagger.tags = ['Produtos']
    //#swagger.summary = "Realiza a exclusão de um produto"

    ctrl.excluir(req, res);
})

export default router;