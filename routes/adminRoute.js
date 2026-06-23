import express from 'express';
import AdminController from '../controller/adminController.js';
const router = express.Router();

let ctrl = new AdminController();

router.post("/", (req, res) =>{

    //#swagger.tags = ['Administrador']
    //#swagger.summary = "Realiza o cadastro do usuário administrador"

    ctrl.cadastrar(req, res);
})

router.post("/login", (req, res) => {

    //#swagger.tags = ['Administrador']
    //#swagger.summary = "Autentica um administrador"

    ctrl.login(req, res);
});

export default router;