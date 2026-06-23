import Database from "../db/database.js";
import Admin from "../entities/admin.js";


export default class AdminRepository{

    #banco;

    constructor(){
        this.#banco = new Database();
    }


    async gravar(entidade){

        let sql = "insert into tb_admin (ad_nome, ad_email, ad_senha) values (?, ?, ?)";
        let valores = [entidade.nome, entidade.email, entidade.senha];

        let result = await this.#banco.ExecutaComandoLastInserted(sql, valores);

        entidade.id = result;
        return result;

    }


    async buscarPorEmail(email){
        let sql = "select * from tb_admin where ad_email = ?";
        let valores = [email];

        let rows = await this.#banco.ExecutaComando(sql, valores);

        if(rows.length > 0){
            let row = rows[0];
            let entidade = new Admin(row["ad_id"], row["ad_nome"], row["ad_email"], row["ad_senha"]);
            return entidade;
        }
        return null;
      }      
}