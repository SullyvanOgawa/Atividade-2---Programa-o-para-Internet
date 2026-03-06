
import obterConexao from './conexao.js';
import Professor from '../Model/professor.js';

export default class ProfessorDB{
    async gravar(professor){
        if(professor instanceof Professor){
            const sql = `INSERT INTO professores(prof_nome, prof_especialidade) 
                                           VALUES (?, ?)`;
            
            const parametros = [
                professor.nome, 
                professor.especialidade         
            ];

            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql, parametros);
            professor.id = resultado[0].insertId;

            conexao.release();
        }
    }

     async editar(professor){
       if(professor instanceof Professor){
            const sql = `UPDATE professores SET prof_nome=?, prof_especialidade=?
                                            WHERE prof_id=?`;
            
            const parametros = [
                professor.nome, 
                professor.especialidade,
                professor.id          
            ];

            const conexao = await obterConexao();
            await conexao.execute(sql, parametros);

            conexao.release();
        }
    }

    async excluir(professor){
        if(professor instanceof Professor){
            const sql = `DELETE FROM professores WHERE prof_id=?`;
            const conexao = await obterConexao();
            await conexao.execute(sql, [professor.id]);
            conexao.release();
        }

    }

    async consultar(termo){
        let sql = "";
        let parametros = [];

        if(isNaN(Number(termo))){
            sql = `SELECT * FROM professores WHERE prof_nome LIKE ?`;
            parametros = [`%${termo}%`];
        }
        else{
            sql = `SELECT * FROM professores WHERE prof_id=?`;
            parametros = [termo];
        }

        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listaProfessores = [];
        for(const resultado of resultados[0]){
            const professor = new Professor(resultado.prof_id, 
                                            resultado.prof_nome, 
                                            resultado.prof_especialidade);
            
            listaProfessores.push(professor);
        }

        return listaProfessores;
    }
}