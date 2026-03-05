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
            const sql = `UPDATE cursos SET curso_nome=?, curso_descricao=?, curso_carga_horaria=? WHERE curso_id=?`;
            
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
}