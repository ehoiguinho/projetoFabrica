import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminEntity from "../entities/admin.js";
import AdminRepository from "../repository/adminRepository.js";


export default class AdminController{

    #repo;
    constructor(){
        this.#repo = new AdminRepository();
    }

    async cadastrar(req, res){
        try{

        let {nome, email, senha} = req.body;
        let entidade = new adminEntity(0, nome, email, senha);
        if(entidade.validar()){
            let senhaHash = await bcrypt.hash(senha, 10);
            entidade.senha = senhaHash;
            let result = await this.#repo.gravar(entidade);

            return res.status(201).json({msg: "Administrador cadastrado com sucesso!",
                admin: entidade
            });
        }
        else {
            return res.status(400).json({msg: "Parâmetros incorretos. Por favor confira os dados do administrador!"});
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({msg: "Erro ao processar requisição!"});
    }

}

    async login(req, res){
        try {

        let { email, senha } = req.body;

        if(!email || !senha){
            return res.status(400).json({
                msg: "Informe email e senha!"
            });
        }

        let admin = await this.#repo.buscarPorEmail(email);

        if(!admin){
            return res.status(404).json({
                msg: "Administrador não encontrado!"
            });
        }

        let senhaCorreta = await bcrypt.compare(senha, admin.senha);

        if(!senhaCorreta){
            return res.status(401).json({
                msg: "Senha incorreta!"
            });
        }

        let token = jwt.sign(
            {
                id: admin.id,
                nome: admin.nome,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(200).json({
            msg: "Login realizado com sucesso!",
            token: token
        });

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            msg: "Erro ao processar requisição!"
        });
    }
}
   
}