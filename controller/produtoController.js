import ProdutoEntity from "../entities/produto.js";
import ProdutoRepository from "../repository/produtoRepository.js";


export default class ProdutoController{

    #repo;

    constructor(){
        this.#repo = new ProdutoRepository();
    }


    async cadastrar(req, res){
        try{
            let {nome, descricao, imagem} = req.body;
            let entidade = new ProdutoEntity(0, nome, descricao, imagem);
            if(entidade){
                let result = await this.#repo.gravar(entidade);
                return res.status(201).json(entidade);
            }
            else{
                return res.status(400).json({msg: "Erro ao cadastrar produto, verifique os campos e tente novamente!"});
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição"});
        }
    }

    async listar(req, res){
        try{
            let entidades = await this.#repo.listar();
            if(entidades.length == 0){
                return res.status(404).json({msg: "Nenhum produto encontrado!"});
            }
                return res.status(200).json(entidades);
        }
        catch(error){
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição."});
        }
    }

    async alterar(req, res){
        try{
            let {id} = req.params;
            let {nome, descricao, imagem} = req.body;
            let produto = new ProdutoEntity(id, nome, descricao, imagem);
            if(produto && id){
                let produtoEncontrado = await this.#repo.obter(id);
                if(produtoEncontrado){
                    let result = await this.#repo.alterar(produto);
                    if(result){
                        return res.status(200).json({msg: "Produto alterado com sucesso!"});
                    }
                    throw new Error("Erro ao atualizar produto no banco de dados");
                }
                else {
                    return res.status(404).json({msg: "Produto não encontrado!"});
                }
            }
            else {
                return res.status(400).json({msg: "Faltam informações para concluir a atualização!"});
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição"});
        }
}

    async excluir(req, res){
        try{
            let {id} = req.params;
            let produto = await this.#repo.obter(id);
            if(produto == null)
                return res.status(404).json({msg: "Produto não encontrado"});

            let result = await this.#repo.deletar(id);
            
            if(result == true){
                return res.status(200).json({msg: "Produto excluído com sucesso!"});
            }
            else {
                throw new Error("Erro ao excluir o usuário do banco de dados");
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisiçao"});
        }
    }
}