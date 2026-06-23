import Database from "../db/database.js";
import ProdutoEntity from "../entities/produto.js";


export default class ProdutoRepository{

    #banco;

    constructor(){
        this.#banco = new Database();
    }


    async gravar(entidade){

        let sql = "insert into tb_produto (p_nome, p_descricao, p_imagem) values (?, ?, ?)";
        let valores = [entidade.nome, entidade.descricao, entidade.imagem];
        let result = await this.#banco.ExecutaComandoLastInserted(sql, valores);

        entidade.id = result;

        return result;

    }

      async listar() {
        let sql = "select * from tb_produto";
        let rows = await this.#banco.ExecutaComando(sql);
        let entidades = [];

        for(let row of rows) {
            entidades.push(new ProdutoEntity(row["p_id"], row["p_nome"], row["p_descricao"], row["p_imagem"]));
        }

        return entidades;

    }

    async alterar(entidadeAtualizada){
        let sql = "update tb_produto set p_nome = ?, p_descricao = ?, p_imagem = ? where p_id = ?";
        let valores = [entidadeAtualizada.nome, entidadeAtualizada.descricao, entidadeAtualizada.imagem, entidadeAtualizada.id];

        let result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id){
        let sql = "select * from tb_produto where p_id = ?";
        let valores = [id];

        let result = await this.#banco.ExecutaComando(sql, valores);

        return result;
    }

    async deletar(id){
        let sql = "delete from tb_produto where p_id = ?";
        let  valores = [id];
        let result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}