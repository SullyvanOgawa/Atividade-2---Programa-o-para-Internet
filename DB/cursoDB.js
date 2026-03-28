import obterConexao from './conexao.js';
import Curso from '../Model/curso.js';
import Professor from '../Model/professor.js';
// import Professor from '../Model/professor.js';
export default class CursoDB{
    async gravar(curso){
        if(curso instanceof Curso){
            const sql = `INSERT INTO cursos(curso_nome, curso_descricao, curso_carga_horaria, prof_id) 
                                           VALUES (?, ?, ?, ?)`;
            
            const parametros = [
                curso.nome, 
                curso.descricao,
                curso.cargaHoraria,
                curso.professor.id          
            ];

            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql, parametros);
            curso.id = resultado[0].insertId;

            conexao.release();
        }
    }

     async editar(curso){
        if(curso instanceof Curso){
            const sql = `UPDATE cursos SET curso_nome=?, curso_descricao=?, curso_carga_horaria=?, prof_id=? WHERE curso_id=?`;
            
            const parametros = [
                curso.nome, 
                curso.descricao,
                curso.cargaHoraria,
                curso.professor.id,
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

        if(!isNaN(Number(termo)) && Number(termo) > 0){
            sql = ` SELECT  c.curso_id,
                            c.curso_nome,
                            c.curso_descricao,
                            c.curso_carga_horaria,
                            p.prof_nome,
                            p.prof_especialidade
                    FROM cursos c
                    INNER JOIN professores p 
                    ON c.prof_id = p.prof_id
                    WHERE c.curso_id = ?`;
            parametros = [termo];
            
        }
        else{

            sql = ` SELECT  c.curso_id,
                            c.curso_nome,
                            c.curso_descricao,
                            c.curso_carga_horaria,
                            p.prof_nome,
                            p.prof_especialidade 
                    FROM cursos c
                    INNER JOIN professores p 
                    ON c.prof_id = p.prof_id
                    WHERE c.curso_nome LIKE ?`;
            parametros = [`%${termo}%`];
           
        }

        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listaCursos = [];
        for(const resultado of resultados[0]){
            const professor = new Professor(resultado.prof_id, resultado.prof_nome, resultado.prof_especialidade);

            const curso = new Curso(resultado.curso_id, 
                                    resultado.curso_nome, 
                                    resultado.curso_descricao, 
                                    resultado.curso_carga_horaria, 
                                    professor);
            
            listaCursos.push(curso);
        }

        return listaCursos;
    }
}