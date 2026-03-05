import obterConexao from './conexao.js';
import Curso from '../Model/curso.js';

export default class CursoDB{
    async gravar(curso){
        if(curso instanceof Curso){
            const sql = `INSERT INTO cursos(curso_nome, curso_descricao, curso_carga_horaria) 
                                           VALUES (?, ?, ?)`;
            
            const parametros = [
                curso.nome, 
                curso.descricao,
                curso.cargaHoraria            
            ];

            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql, parametros);
            curso.id = resultado[0].insertId;

            conexao.release();
        }
    }

     async editar(curso){
        if(curso instanceof Curso){
            const sql = `UPDATE cursos SET curso_nome=?, curso_descricao=?, curso_carga_horaria=? 
                                       WHERE curso_id=?`;
            
            const parametros = [
                curso.nome, 
                curso.descricao,
                curso.cargaHoraria, 
                curso.id          
            ];

            const conexao = await obterConexao();
            await conexao.execute(sql, parametros);

            conexao.release();
        }
    }

    async excluir(curso){
        if(curso instanceof Curso){
            const sql = `DELETE FROM cursos WHERE curso_id=?`;
            const conexao = await obterConexao();
            await conexao.execute(sql, [curso.id]);
            conexao.release();
        }

    }

    async consultar(termo){
        let sql = "";
        let parametros = [];

        if(isNaN(Number(termo))){
            sql = `SELECT * FROM cursos WHERE curso_nome LIKE ?`;
            parametros = [`%${termo}%`];
        }
        else{
            sql = `SELECT * FROM cursos WHERE curso_id=?`;
            parametros = [termo];
        }

        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listaCursos = [];
        for(const resultado of resultados[0]){
            const curso = new Curso(resultado.curso_id, 
                                    resultado.curso_nome, 
                                    resultado.curso_descricao, 
                                    resultado.curso_carga_horaria);
            
            listaCursos.push(curso);
        }

        return listaCursos;
    }
}